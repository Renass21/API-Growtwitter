import { Response } from "express";

export function serverError(res: Response, error: any) {
    return res.status(500).send({
        ok: false,
        message: error.toString()
    })
}

export function errorNotFound(res: Response, entity: string) {
    return res.status(404).send({
        ok: false,
        message: `${entity} does not exist.`
    })
}

export function errorBadRequest(res: Response) {
    return res.status(400).send({
        ok: false,
        message: "Enter all mandatory fields"
    });    

}    

export function sucessfullRequest(res: Response, entity: any) {
    return res.status(200).send({
        ok: true,
        data: `${entity}`
    });
}

