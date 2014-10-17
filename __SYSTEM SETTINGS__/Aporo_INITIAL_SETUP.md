macports install mysql55, mysql55-server

use sudo port select mysql mysql55

grant permissions


secure install

mysqladmin -u root password NEWPASSWORD

mysql -u root -p (no password)

CREATE USER 'root'@'%' IDENTIFIED BY 'Delivery100%';