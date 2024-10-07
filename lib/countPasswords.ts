import { Element } from "@prisma/client";

export function countPasswords(elements: Element[]) {

    const passwordsCounts = new Map<string, number>()

    elements.forEach(element => {
        const password = element.password
        if (password) {
            if (passwordsCounts.has(password)) {
                passwordsCounts.set(password, (passwordsCounts.get(password) || 0) + 1)
            } else {
                passwordsCounts.set(password, 1)
            }
        }
    })

    let uniquePasswordCount = 0
    let repeatedPasswordCount = 0

    passwordsCounts.forEach((count) => {
        if (count === 1) {
            uniquePasswordCount++
        } else {
            repeatedPasswordCount++
        }
    })

    return {
        unique: uniquePasswordCount,
        repeated: repeatedPasswordCount
    }
}