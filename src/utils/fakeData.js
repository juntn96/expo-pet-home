export const postData = [
  {
    postId: 1,
    postDate: "April 15, 2016",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry",
    type: "Playground",
    postImage: [
      {
        uri: require("../assets/images/bg2.png"),
      },
      {
        uri: require("../assets/images/bg3.png"),
      },
      {
        uri: require("../assets/images/bg4.png"),
      },
    ],
    postVideo: [],
    userData: {
      name: "Lam Ngoc Khanh",
      picture: require("../assets/images/bg1.png"),
    },
    interactive: {
      upvote: "10k",
      comment: "300",
      downvote: "10",
      saved: false,
      hidden: false,
    },
    report: {},
  },
  {
    postId: 2,
    postDate: "April 15, 2016",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry",
    type: "Playground",
    postImage: [
      {
        uri: require("../assets/images/bg2.png"),
      },
      {
        uri: require("../assets/images/bg3.png"),
      },
      {
        uri: require("../assets/images/bg4.png"),
      },
    ],
    postVideo: [],
    userData: {
      name: "Ta Dinh Chien",
      picture: require("../assets/images/bg1.png"),
    },
    interactive: {
      upvote: "10k",
      comment: "300",
      downvote: "10",
      saved: false,
      hidden: false,
    },
    report: {},
  },
  {
    postId: 3,
    postDate: "April 15, 2016",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry",
    type: "Playground",
    postImage: [
      {
        uri: require("../assets/images/bg2.png"),
      },
      {
        uri: require("../assets/images/bg3.png"),
      },
      {
        uri: require("../assets/images/bg4.png"),
      },
    ],
    postVideo: [],
    userData: {
      name: "Phan Hoang Trung",
      picture: require("../assets/images/bg1.png"),
    },
    interactive: {
      upvote: "10k",
      comment: "300",
      downvote: "10",
      saved: false,
      hidden: false,
    },
    report: {},
  },
  {
    postId: 4,
    postDate: "April 15, 2016",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry",
    type: "Playground",
    postImage: [
      {
        uri: require("../assets/images/bg2.png"),
      },
      {
        uri: require("../assets/images/bg3.png"),
      },
      {
        uri: require("../assets/images/bg4.png"),
      },
    ],
    postVideo: [],
    userData: {
      name: "Nguy Van Thang",
      picture: require("../assets/images/bg1.png"),
    },
    interactive: {
      upvote: "10k",
      comment: "300",
      downvote: "10",
      saved: false,
      hidden: false,
    },
    report: {},
  },
];

export const locationData = [
  {
    id: "1",
    name: "Bệnh viện thú y",
    type: "hospital",
    coordinate: {
      latitude: 21.011550,
      longitude: 105.522508,
    },
    images: [
      {
        url: "https://picsum.photos/500/?image=600",
      },
      {
        url: "https://picsum.photos/500/?image=603",
      },
      {
        url: "https://picsum.photos/500/?image=610",
      },
      {
        url: "https://picsum.photos/500/?image=612",
      },
      {
        url: "https://picsum.photos/500/?image=200",
      },
    ],
    rating: 4,
    reviews: [],
  },
  {
    id: "2",
    name: "Đồ chơi cho pet",
    type: "store",
    coordinate: {
      latitude: 21.014492,
      longitude: 105.530484,
    },
    images: [
      {
        url: "https://picsum.photos/500/?image=600",
      },
      {
        url: "https://picsum.photos/500/?image=603",
      },
      {
        url: "https://picsum.photos/500/?image=610",
      },
      {
        url: "https://picsum.photos/500/?image=612",
      },
      {
        url: "https://picsum.photos/500/?image=200",
      },
    ],
    rating: 4,
    reviews: [],
  },
  {
    id: "3",
    name: "Đồ ăn cho pet",
    type: "store",
    coordinate: {
      latitude: 21.009129,
      longitude: 105.527472,
    },
    images: [
      {
        url: "https://picsum.photos/500/?image=600",
      },
      {
        url: "https://picsum.photos/500/?image=603",
      },
      {
        url: "https://picsum.photos/500/?image=610",
      },
      {
        url: "https://picsum.photos/500/?image=612",
      },
      {
        url: "https://picsum.photos/500/?image=200",
      },
    ],
    rating: 4,
    reviews: [],
  },
  {
    id: "4",
    name: "Trạm cứu hộ Pet",
    type: "home",
    coordinate: {
      latitude: 21.011107,
      longitude: 105.534416,
    },
    images: [
      {
        url: "https://picsum.photos/500/?image=600",
      },
      {
        url: "https://picsum.photos/500/?image=603",
      },
      {
        url: "https://picsum.photos/500/?image=610",
      },
      {
        url: "https://picsum.photos/500/?image=612",
      },
      {
        url: "https://picsum.photos/500/?image=200",
      },
    ],
    rating: 4,
    reviews: [],
  },
  {
    id: "5",
    name: "Tìm hoàng thượng",
    type: "sos",
    coordinate: {
      latitude: 21.011289,
      longitude: 105.526440,
    },
    images: [
      {
        url: "https://picsum.photos/500/?image=600",
      },
      {
        url: "https://picsum.photos/500/?image=603",
      },
      {
        url: "https://picsum.photos/500/?image=610",
      },
      {
        url: "https://picsum.photos/500/?image=612",
      },
      {
        url: "https://picsum.photos/500/?image=200",
      },
    ],
    rating: 4,
    reviews: [],
  },
];


export const markerType = {
  hospital: require('../assets/icons/marker_hospital.png'),
  sos: require('../assets/icons/marker_sos.png'),
  store: require('../assets/icons/marker_store.png'),
  home: require("../assets/icons/marker_home.png")
}