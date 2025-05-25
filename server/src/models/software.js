// const { Entity, PrimaryGeneratedColumn, Column, OneToMany } = require("typeorm");
// const Request = require("./Request");

// @Entity()
// class Software {
//     @PrimaryGeneratedColumn()
//     id:Number;

//     @Column()
//     name:String

//     @Column("text")
//     description;

//     @Column("simple-array")
//     accessLevels;

//     @OneToMany(() => Request, (request) => request.software)
//     requests;
// }


const { EntitySchema } = require("typeorm");

const Software= new EntitySchema({
  name: "Software",
  tableName: "software",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
    description: {
      type: "text",
    },
    accessLevels: {
      type: "simple-array",
    },
  },
  relations: {
    requests: {
      type: "one-to-many",
      target: "Request",
      inverseSide: "software",
    },
  },
});

 module.exports = Software;