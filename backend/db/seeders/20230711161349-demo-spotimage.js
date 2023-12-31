'use strict';

/** @type {import('sequelize-cli').Migration} */
const { SpotImage } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/83c7dd43-2069-48aa-a580-fcce551c8518.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-20957967/original/924fd085-99fa-4cab-abd9-e4fa505479ac.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 4,
        url: "https://media.istockphoto.com/id/1026205392/photo/beautiful-luxury-home-exterior-at-twilight.jpg?s=612x612&w=0&k=20&c=HOCqYY0noIVxnp5uQf1MJJEVpsH_d4WtVQ6-OwVoeDo=",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/b7c9264d-73c9-45c3-882e-6e9577d63d68.jpg?im_w=720",
        preview: true,
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-841972947487368025/original/dacb9242-6051-40f2-acaa-7aacc6473465.jpeg?im_w=720",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://www.shutterstock.com/shutterstock/photos/1514333600/display_1500/stock-photo-houses-in-suburb-at-summer-in-the-north-america-luxury-houses-with-nice-landscape-1514333600.jpg",
        preview: true,
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-46695796/original/a0965aa5-3907-466e-b727-0900e2a7e8c7.jpeg?im_w=720",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-605147835719527837/original/cd47ca09-e9c2-4ba4-8fec-ca1b9a447919.png?im_w=720",
        preview: false,
      }
    ], {validate: true});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3]}
    }, {});
  }
};
