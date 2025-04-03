CREATE TABLE `reversal` (
	`id` varchar(36) NOT NULL,
	`originalTransactionId` varchar(36) NOT NULL,
	`reversalTransactionId` varchar(36) NOT NULL,
	`requesterId` varchar(36) NOT NULL,
	CONSTRAINT `reversal_id` PRIMARY KEY(`id`),
	CONSTRAINT `reversal_originalTransactionId_unique` UNIQUE(`originalTransactionId`),
	CONSTRAINT `reversal_reversalTransactionId_unique` UNIQUE(`reversalTransactionId`)
);
--> statement-breakpoint
CREATE TABLE `transaction` (
	`id` varchar(36) NOT NULL,
	`senderId` varchar(36) NOT NULL,
	`receiverId` varchar(36) NOT NULL,
	`type` varchar(255) NOT NULL,
	`amount` decimal(6,2) NOT NULL,
	`createdAt` timestamp NOT NULL,
	`updatedAt` timestamp NOT NULL,
	CONSTRAINT `transaction_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL,
	`updatedAt` timestamp NOT NULL,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `reversal` ADD CONSTRAINT `reversal_originalTransactionId_transaction_id_fk` FOREIGN KEY (`originalTransactionId`) REFERENCES `transaction`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reversal` ADD CONSTRAINT `reversal_reversalTransactionId_transaction_id_fk` FOREIGN KEY (`reversalTransactionId`) REFERENCES `transaction`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reversal` ADD CONSTRAINT `reversal_requesterId_user_id_fk` FOREIGN KEY (`requesterId`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_senderId_user_id_fk` FOREIGN KEY (`senderId`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_receiverId_user_id_fk` FOREIGN KEY (`receiverId`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;