import { request, gql } from "graphql-request";
const MASTER_URL =
  "https://api-ap-south-1.hygraph.com/v2/clta1bgf6292j07useyabwiiv/master";

const getSlider = async () => {
  const query = gql`
    query getSliders {
      sliders {
        id
        name
        image {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getCategory = async () => {
  const query = gql`
    query getCategory {
      categories {
        name
        id
        icon {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};
const getBusinessLists = async () => {
  const query = gql`
    query getBusinessList {
      businessLists {
        id
        name
        contactPerson
        email
        category {
          name
        }
        address
        about
        images {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getBusinessListByCategory = async (category) => {
  const query =
    gql`
    query getBusinessList {
      businessLists(where: {category: {name: "` +
    category +
    `"}}) {
        id
        name
        contactPerson
        email
        category {
          name
        }
        address
        about
        images {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const createBooking = async (data) => {
  const mutationQuery =
    gql`
    mutation createBooking {
      createBooking(
        data: {
          bookingStatus: Booked
          date: "` +
    data.date +
    `"
          time: "` +
    data.time +
    `"
          username: "` +
    data.userEmail +
    `"
          userEmail: "` +
    data.username +
    `"
          businessList: { connect: { id: "` +
    data.businessid +
    `" } }
        }
      ) {
        id
      }
      publishManyBookings(to: PUBLISHED) {
    count
  }
    }
  `;
  const result = await request(MASTER_URL, mutationQuery);
  return result;
};

const getUserBooking = async (userEmail) => {
  const query =
    gql`
    query getUserBookings {
      bookings(orderBy: updatedAt_DESC, where: { userEmail: "` +
    userEmail +
    `" }) {
        bookingStatus
        time
        userEmail
        username
        date
        id
        businessList {
          id
          images {
            url
          }
          name
          contactPerson
          address
          email
          about
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

export default {
  getSlider,
  getCategory,
  getBusinessLists,
  getBusinessListByCategory,
  createBooking,
  getUserBooking,
};
