const form = document.querySelector('.form')
const button = document.querySelector('.button')

const sendForm = async () => {
    const { name, email, phone, project_type, project_description, budget_min, budget_max } = form

    try {
        const response = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                phone: phone.value,
                project_type: project_type.value,
                project_description: project_description.value,
                budget_min: budget_min.value,
                budget_max: budget_max.value
            })
        })

        const data = await response.json()
        
        if (!response.ok) {
            throw new Error(data.errors ? data.errors.map(err => err.msg).join(", ") : "Ошибка отправки формы")
        }

        alert("Ваша заявка принята!")
        form.reset()
    } catch (error) {
        alert(error.message || "Произошла ошибка при отправке формы")
    } 
}

button.addEventListener('click', async (event) => {
    event.preventDefault()
    await sendForm()
})
