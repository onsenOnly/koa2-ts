import { BaseService } from "./baseService";
import { OrderModel, OrderDocument } from "../model/order";

class UserService extends BaseService {
    index() {
        return 2 + 3;
    }
    createOder(user: string, price: string, type: string) {
        return new Promise(function (resolve, reject) {
            OrderModel.create({ user: user, price: price, type: price }, function (err: any, order: OrderDocument) {
                if (err) {
                    return reject(err);
                }
                return resolve(order);
            });
        });
    }
}

module.exports = UserService;