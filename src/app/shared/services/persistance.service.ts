import { Injectable } from "@angular/core";

@Injectable()
export class PersistanceService {
    set(key: string, data: any): void {
        try {
          localStorage.setItem(key, JSON.stringify(data))
        } catch (e) {
            console.log(e)
        }
    }

    get (key: string): any {
        try {
        const parseKey = localStorage.getItem(key) as string;
         return JSON.parse(parseKey)
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}