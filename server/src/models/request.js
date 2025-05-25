// const { Entity, PrimaryGeneratedColumn, Column, ManyToOne } = require("typeorm");
// const User = require("./user");
// const Software = require("./software");

// @Entity()
// class Request {
//     @PrimaryGeneratedColumn()
//     id;

//     @ManyToOne(() => User, (user) => user.requests)
//     user;

//     @ManyToOne(() => Software, (software) => software.requests)
//     software;

//     @Column()
//     accessType; // 'Read', 'Write', or 'Admin'

//     @Column("text")
//     reason;

//     @Column()
//     status = "Pending"; // 'Pending', 'Approved', or 'Rejected'
// }
const { EntitySchema } = require("typeorm");
const User = require("./user");
const Software = require("./software");

const Request = new EntitySchema({
  name: "Request",
  tableName: "requests",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    accessType: {
      type: "varchar",
    },
    reason: {
      type: "text",
    },
    status: {
      type: "varchar",
      default: "Pending",
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: User, 
      joinColumn: true,
      eager: true,
    },
    software: {
      type: "many-to-one",
      target: Software, 
      joinColumn: true,
      eager: true,
    },
  },
});

module.exports = Request;
