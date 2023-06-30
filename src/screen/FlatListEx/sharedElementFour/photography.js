import {faker} from "@faker-js/faker";

export const photographyImages = [
    'https://cdn.pixabay.com/photo/2015/10/09/00/55/lotus-978659__480.jpg',
    'https://cdn.pixabay.com/photo/2018/01/29/07/11/flower-3115353__340.jpg',
    'https://cdn.pixabay.com/photo/2017/02/15/13/40/tulips-2068692__340.jpg',
    'https://cdn.pixabay.com/photo/2016/08/28/23/24/sunflower-1627193__340.jpg',
    'https://cdn.pixabay.com/photo/2016/07/10/09/41/lavender-1507499__340.jpg',
    'https://cdn.pixabay.com/photo/2016/11/29/09/16/roses-1868669__340.jpg',
    'https://cdn.pixabay.com/photo/2012/12/14/11/36/leaves-69999__340.jpg',
    'https://cdn.pixabay.com/photo/2018/05/01/18/30/lilac-3366467__340.jpg',
    'https://cdn.pixabay.com/photo/2020/11/23/15/00/butterfly-5770034__340.jpg',
    'https://cdn.pixabay.com/photo/2016/03/26/13/09/workspace-1280538__340.jpg',
];

export default [...Array(10).keys()].map((i) => {
    return{
        key: String(i),
        title: faker.name.jobTitle(),
        description: faker.commerce.productDescription(),
        location: faker.address.streetAddress(true),
        image: photographyImages[i],
        user: {
            name: faker.name.findName(),
            avatar: faker.internet.avatar(),
            job: faker.name.jobType(),
            details: [
                {
                    label: 'Shots',
                    value: Math.floor(Math.random() * 2200) + 1000
                },
                {
                    label: 'Followers',
                    value: Math.floor(Math.random() * 3500) + 1000
                },
                {
                    label: 'Following',
                    value: Math.floor(Math.random() * 3500) + 1000
                },
            ],
        },
    };
});

// const imagesAll = [...Array(photographyImages.length).keys()].map((i) => {
//     return{
//         key: String(i),
//         image: photographyImages[i],
//     };
// });

// export default imagesAll;