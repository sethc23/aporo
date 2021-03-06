# vim:set ft= ts=4 sw=4 et fdm=marker:
use lib 'lib';
use Test::Nginx::Socket::Lua;
use Cwd qw(cwd);

#worker_connections(1014);
#master_process_enabled(1);
#log_level('warn');

repeat_each(2);

plan tests => repeat_each() * (blocks() * 4 + 6);

my $pwd = cwd();

our $HttpConfig = <<_EOC_;
    lua_package_path "$pwd/lib/?.lua;../lua-resty-lrucache/lib/?.lua;;";
    init_by_lua '
        -- local verbose = true
        local verbose = false
        local outfile = "$Test::Nginx::Util::ErrLogFile"
        -- local outfile = "/tmp/v.log"
        if verbose then
            local dump = require "jit.dump"
            dump.on(nil, outfile)
        else
            local v = require "jit.v"
            v.on(outfile)
        end

        require "resty.core"
        -- jit.opt.start("hotloop=1")
        -- jit.opt.start("loopunroll=1000000")
        -- jit.off()
    ';
_EOC_

#no_diff();
no_long_string();
check_accum_error_log();
run_tests();

__DATA__

=== TEST 1: sub, no submatch, no jit compile, regex cache
--- http_config eval: $::HttpConfig
--- config
    location = /re {
        access_log off;
        content_by_lua '
            local m, err
            local sub = ngx.re.sub
            for i = 1, 350 do
                s, n, err = sub("abcbd", "b", "B", "jo")
            end
            if not s then
                ngx.log(ngx.ERR, "failed: ", err)
                return
            end
            ngx.say("s: ", s)
            ngx.say("n: ", n)
        ';
    }
--- request
GET /re
--- response_body
s: aBcbd
n: 1
--- error_log eval
qr/\[TRACE   \d+ content_by_lua:4 loop\]/
--- no_error_log
[error]
bad argument type
NYI



=== TEST 2: sub, no submatch, no jit compile, no regex cache
--- http_config eval: $::HttpConfig
--- config
    location = /re {
        access_log off;
        content_by_lua '
            local m, err
            local sub = ngx.re.sub
            for i = 1, 400 do
                s, n, err = sub("abcbd", "b", "B")
            end
            if not s then
                ngx.log(ngx.ERR, "failed: ", err)
                return
            end
            ngx.say("s: ", s)
            ngx.say("n: ", n)
        ';
    }
--- request
GET /re
--- response_body
s: aBcbd
n: 1
--- error_log eval
qr/\[TRACE   \d+ content_by_lua:4 loop\]/
--- no_error_log
[error]
bad argument type



=== TEST 3: func + submatches
--- http_config eval: $::HttpConfig
--- config
    location = /re {
        access_log off;
        content_by_lua '
            local m, err
            local function f(m)
                return "[" .. m[0] .. "(" .. m[1] .. ")]"
            end
            local sub = ngx.re.sub
            for i = 1, 200 do
                s, n, err = sub("abcbd", "b(c)", f, "jo")
            end
            if not s then
                ngx.log(ngx.ERR, "failed: ", err)
                return
            end
            ngx.say("s: ", s)
            ngx.say("n: ", n)
        ';
    }
--- request
GET /re
--- response_body
s: a[bc(c)]bd
n: 1
--- no_error_log
[error]
bad argument type
NYI



=== TEST 4: replace template + submatches
--- http_config eval: $::HttpConfig
--- config
    location = /re {
        access_log off;
        content_by_lua '
            local m, err
            local sub = ngx.re.sub
            for i = 1, 350 do
                s, n, err = sub("abcbd", "b(c)", "[$0($1)]", "jo")
            end
            if not s then
                ngx.log(ngx.ERR, "failed: ", err)
                return
            end
            ngx.say("s: ", s)
            ngx.say("n: ", n)
        ';
    }
--- request
GET /re
--- response_body
s: a[bc(c)]bd
n: 1
--- error_log eval
qr/\[TRACE   \d+ content_by_lua:4 loop\]/

--- no_error_log
[error]
bad argument type
NYI



=== TEST 5: replace template + submatches (exceeding buffers)
--- http_config eval: $::HttpConfig
--- config
    location = /re {
        access_log off;
        content_by_lua '
            local m, err
            local gsub = ngx.re.gsub
            local subj = string.rep("bcbd", 2048)
            for i = 1, 10 do
                s, n, err = gsub(subj, "b(c)", "[$0($1)]", "jo")
            end
            if not s then
                ngx.log(ngx.ERR, "failed: ", err)
                return
            end
            ngx.say("s: ", s)
            ngx.say("n: ", n)
        ';
    }
--- request
GET /re
--- response_body eval
"s: " . ("[bc(c)]bd" x 2048) .
"\nn: 2048\n"

--- no_error_log
[error]
bad argument type

