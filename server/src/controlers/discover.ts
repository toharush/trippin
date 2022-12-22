import { hereApi } from '../utils/api';
const here = hereApi();

export const discover = async () => {
    const res = await here.discover({
        q: 'restaurant',
        at: '-13.163068,-72.545128',
    });
    console.log(res.data.items);
    return res.data.items;
};
