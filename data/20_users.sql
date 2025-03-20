INSERT INTO users (first_name, last_name, username, password, email, is_super_admin)
VALUES
    ('Admin', '', 'admin', '$argon2id$v=19$m=19456,t=2,p=1$b6Ivsy35lxuz9HU8iVxnOA$PmcjfGSzMM9cpdQXlQGd8zzvH+2bPpbuh3/k1qpN+/Q', 'admin@example.com', true), -- pw: admin
    ('Martin', 'Carsile', 'thedoctor', '$argon2id$v=19$m=19456,t=2,p=1$LBxCGPMdwhmJ5nlEQB3OhA$EorXN8wkZvNruhz9So/PefLdlLnir3vASRP2XFsIfoc', 'instructor@example.com', false), -- pw: thedoctor
    ('Marvin', 'Fung', 'marfung', '$argon2id$v=19$m=19456,t=2,p=1$fDncxM9VkJQb0dpeHaZbgg$4fgtP79u90+cBuuzt5BRw0V+uKVGtv/OPCs8tSFr6gs', 'marfung37@tamu.edu', false), -- pw: marfung
    ('Lucian', 'Chauvin', 'lucian', '$argon2id$v=19$m=19456,t=2,p=1$Ux1DBnYWIG5j3NSEroj2Yw$6KyAwTMNs/6VGHHkRxU9eOPL5nkGT07SzEhg7MXt7tc', 'lucian@tamu.edu', false); -- pw: lucian
