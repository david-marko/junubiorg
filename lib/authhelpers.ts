
import {Md5} from 'ts-md5';

export function saltAndHashPassword(password: string) {
    return Md5.hashStr(password);
}