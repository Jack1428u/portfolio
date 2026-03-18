export default function ContactForm() {
    return (
        <>
            <form method="POST">
                <label for="name">Name</label>
                <input
                    name="name"
                    id="name"
                    value=""
                    placeholder="...Your name"
                    type="text"
                />

                <br />
                <label for="email">Email</label>
                <input
                    name="email"
                    id="email"
                    value=""
                    placeholder="example@gmail.com"
                    type="email"
                />

                <br />
                <label for="message">Message</label>
                <input
                    name="message"
                    id="message"
                    value=""
                    placeholder="...Your message"
                    textArea="5"
                />
                <br />

                <label for="project_type">Project Type</label>

                <input
                    name="project_type"
                    id="project_type"
                    value=""
                    placeholder="...Your project_type" />
            </form>
        </>
    )
}