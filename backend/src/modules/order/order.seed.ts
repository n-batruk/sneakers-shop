import { CreateOdredSeedType } from './order.type';

export const OrderSeeds: CreateOdredSeedType[] = [
  {
    id: '63c167cc-b8dd-4ff1-8e5a-b39529afd9f5',
    user_id: 'c620cefd-ead5-4801-9645-c4003aff8719',
    created_at: new Date('2024-04-14T13:54:32.703Z'),
    delivery: {
      address: '123 Main Street',
      status: 'DELIVERED',
    },
    order_products: [
      {
        count: 1,
        price: 42.5,
        product_id: 'a165d513-04a2-4b43-97aa-1338afa9e335',
      },
      {
        count: 2,
        price: 46.5,
        product_id: 'ea6d662b-f17a-4a46-b069-345aa698aa68',
      },
    ],
    payment: {
      amount: 42.5 + 46.5 * 2,
      status: 'ACCEPTED',
    },
  },
  {
    id: 'd84b44d2-5f94-4033-8cd0-b9af376eee9f',
    user_id: 'c620cefd-ead5-4801-9645-c4003aff8719',
    created_at: new Date('2024-04-14T13:54:32.703Z'),
    delivery: {
      address: '123 Olive Street',
      status: 'INPROGRESS',
    },
    order_products: [
      {
        count: 5,
        price: 46.5,
        product_id: 'ea6d662b-f17a-4a46-b069-345aa698aa68',
      },
    ],
    payment: {
      amount: 46.5 * 5,
      status: 'INPROGRESS',
    },
  },
  {
    id: '42fb3dfe-614b-4430-8c69-a3eeab68991f',
    user_id: 'c620cefd-ead5-4801-9645-c4003aff8719',
    created_at: new Date('2024-04-13T13:54:32.703Z'),
    delivery: {
      address: '123 Other Street',
      status: 'DELIVERED',
    },
    order_products: [
      {
        count: 3,
        price: 38.8,
        product_id: '5b453afd-c332-47ca-90f0-65838f2379c9',
      },
    ],
    payment: {
      amount: 38.8 * 3,
      status: 'ACCEPTED',
    },
  },
  {
    id: '5cfe7a32-291e-45bf-bf27-820730d003fa',
    user_id: '3ff00d79-6799-4ffc-adf8-de5cfd264898',
    created_at: new Date('2024-04-11T13:54:32.703Z'),
    delivery: {
      address: '52 Solid Street',
      status: 'INPROGRESS',
    },
    order_products: [
      {
        count: 2,
        price: 27.83,
        product_id: '7a073cf8-9617-4fda-b286-c211071dff2e',
      },
      {
        count: 1,
        price: 34.23,
        product_id: '2e2c5ca0-a072-48a8-992f-ebd74f01d234',
      },
      {
        count: 1,
        price: 29.45,
        product_id: '1974d32e-2dce-41c2-908e-e12b3bf27082',
      },
    ],
    payment: {
      amount: 27.83 * 2 + 34.23 + 29.45,
      status: 'ACCEPTED',
    },
  },
  {
    id: '5d818dc0-a235-4434-ab44-7bc10809c953',
    user_id: '3ff00d79-6799-4ffc-adf8-de5cfd264898',
    created_at: new Date('2024-04-10T13:54:32.703Z'),
    delivery: {
      address: '52 Solid Street',
      status: 'INPROGRESS',
    },
    order_products: [
      {
        count: 1,
        price: 29.45,
        product_id: '1974d32e-2dce-41c2-908e-e12b3bf27082',
      },
    ],
    payment: {
      amount: 29.45,
      status: 'INPROGRESS',
    },
  },
  {
    id: 'dab488d1-a6d8-4b10-acde-b2270125a453',
    user_id: '3ff00d79-6799-4ffc-adf8-de5cfd264898',
    created_at: new Date('2024-04-10T13:54:32.703Z'),
    delivery: {
      address: '52 Solid Street',
      status: 'INPROGRESS',
    },
    order_products: [
      {
        count: 1,
        price: 34.23,
        product_id: '2e2c5ca0-a072-48a8-992f-ebd74f01d234',
      },
    ],
    payment: {
      amount: 34.23,
      status: 'REJECTED',
    },
  },
  {
    id: '730f2c60-101b-4e8c-a728-cb59491e3604',
    user_id: '3ff00d79-6799-4ffc-adf8-de5cfd264898',
    created_at: new Date('2024-04-09T13:54:32.703Z'),
    delivery: {
      address: '52 Solid Street',
      status: 'DELIVERED',
    },
    order_products: [
      {
        count: 1,
        price: 27.83,
        product_id: '7a073cf8-9617-4fda-b286-c211071dff2e',
      },
    ],
    payment: {
      amount: 27.83,
      status: 'ACCEPTED',
    },
  },
];
