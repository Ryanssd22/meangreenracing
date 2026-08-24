import { list } from '@vercel/blob'
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export const load = (({}) => {
    const hero_response = list({
        token: BLOB_READ_WRITE_TOKEN,
        prefix: "media/",
    });
    
    return {
        "hero_response": hero_response,
    };
});