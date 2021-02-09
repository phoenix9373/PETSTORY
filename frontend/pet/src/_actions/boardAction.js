
import { request } from '../utils/axios';

const BOARD_API_BASE_URL = '/board';

export function CreateArticle(BoardForm) {
    const data = request('POST', `${BOARD_API_BASE_URL}/create`, BoardForm);
    return {
        type: BoardForm,
        payload: data,
    };
}
// 이거뭐야..
