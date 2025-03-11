import { body } from "express-validator";

export const checkData = [
    body('name', "Имя обязательно для заполнения")
        .trim()
        .notEmpty()
        .isLength({ min: 2, max: 50 })
        .withMessage("Имя должно быть от 2 до 50 символов"),

    body('email', "Email обязателен для заполнения")
        .trim()
        .notEmpty()
        .isEmail()
        .withMessage("Некорректный формат email"),

    body('phone', "Телефон обязателен для заполнения")
        .trim()
        .notEmpty()
        .matches(/^\+?[0-9]{10,15}$/)
        .withMessage("Телефон должен содержать от 10 до 15 цифр"),

    body('project_type', "Тип проекта обязателен для заполнения")
        .trim()
        .notEmpty()
        .isLength({ min: 5, max: 100 })
        .withMessage("Тип проекта должен быть от 5 до 100 символов"),

    body('project_description', "Описание проекта обязательно для заполнения")
        .trim()
        .notEmpty()
        .isLength({ min: 10, max: 1000 })
        .withMessage("Описание проекта должно быть от 10 до 1000 символов"),

    body('budget_min', "Минимальный бюджет обязателен для заполнения")
        .trim()
        .notEmpty()
        .isInt({ min: 0 })
        .withMessage("Минимальный бюджет должен быть числом больше или равным 0"),

    body('budget_max', "Максимальный бюджет обязателен для заполнения")
        .trim()
        .notEmpty()
        .isInt({ min: 0 })
        .withMessage("Максимальный бюджет должен быть числом больше или равным 0")
        .custom((value, { req }) => {
            if (parseInt(value) < parseInt(req.body.budget_min)) {
                throw new Error("Максимальный бюджет должен быть больше или равен минимальному");
            }
            return true;
        }),
];