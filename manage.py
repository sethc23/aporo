#!/usr/bin/env python
from os import environ
from sys import argv

if __name__ == '__main__':
    environ.setdefault("DJANGO_SETTINGS_MODULE", "aporo.settings")

    from django.core.management import execute_from_command_line

    execute_from_command_line(argv)
    # main()


