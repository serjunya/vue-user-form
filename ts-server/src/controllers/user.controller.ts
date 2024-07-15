import users from "../../datasets/users.json";
import { Request, Response } from "express";

export function getUser(req: Request, res: Response) {
    const email = req.query.email;
    const phoneNumber = req.query.phoneNumber;

    try {
        if (
            email &&
            /^(\w+[-.])*[\w]+@([\w]+[.-])*[\w]+\.[a-z]{2,4}$/.test(
                `${email}`,
            ) &&
            (!phoneNumber || (phoneNumber && /[\d]{6}/.test(`${phoneNumber}`)))
        ) {
            const filteredUsers = users.filter(
                (user) =>
                    user.email === email &&
                    (phoneNumber ? user.number === phoneNumber : true),
            );
            setTimeout(() => {
                res.status(200).json(filteredUsers);
            }, 5000);
        } else {
            throw new Error();
        }
    } catch (e: any) {
        res.sendStatus(500);
    }
}
