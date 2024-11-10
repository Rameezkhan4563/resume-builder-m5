document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resume-form") as HTMLFormElement | null;
    const resumeContainer = document.getElementById("resume-container") as HTMLElement | null;

    if (!form || !resumeContainer) {
        console.error("Form or Resume container not found.");
        return;
    }

    form.addEventListener("submit", (event: Event) => {
        event.preventDefault(); // Prevent form from reloading

        const nameElement = document.getElementById("name") as HTMLInputElement | null;
        const contactElement = document.getElementById("contact") as HTMLInputElement | null;
        const emailElement = document.getElementById("email") as HTMLInputElement | null;
        const educationElement = document.getElementById("education") as HTMLTextAreaElement | null;
        const skillsElement = document.getElementById("skills") as HTMLTextAreaElement | null;
        const workExperienceElement = document.getElementById("work-experience") as HTMLTextAreaElement | null;
        const profilePicElement = document.getElementById("profile-pic") as HTMLInputElement | null;

        const name = nameElement?.value || "";
        const contact = contactElement?.value || "";
        const email = emailElement?.value || "";
        const education = educationElement?.value || "";
        const skills = skillsElement?.value || "";
        const workExperience = workExperienceElement?.value || "";
        const profilePic = profilePicElement?.files?.[0] || null;

        console.log("Form data collected:", { name, contact, email, education, skills, workExperience });

        // Hide the form
        form.style.display = "none";

        resumeContainer.innerHTML = "";

        const initializeShareButton = () => {
            const shareButton = document.getElementById("share-button") as HTMLButtonElement | null;
            if (!shareButton) return;

            shareButton.addEventListener("click", () => {
                const resumeUrl = "https://your-resume-link.com"; // Replace this with the actual URL if available
                navigator.clipboard.writeText(resumeUrl).then(() => {
                    alert("Resume link copied to clipboard!");
                }).catch((err) => {
                    console.error("Failed to copy resume link: ", err);
                });
            });
        };

        const generateResumeContent = (profileImageUrl: string | null) => {
            let resumeContent = `
                <div class="resume animated-fadeIn">
                    <h1 class="resume-title">Resume</h1>
                    <section class="resume-section personal-info">
            `;

            if (profileImageUrl) {
                resumeContent += `
                    <img src="${profileImageUrl}" alt="Profile Picture" class="profile-pic animated-bounceIn" />
                `;
            } else {
                resumeContent += `<p>No profile picture uploaded.</p>`;
            }

            resumeContent += `
                    <p><strong>Name:</strong> <span id="name-display">${name}</span></p>
                    <p><strong>Contact Number:</strong> <span id="contact-display">${contact}</span></p>
                    <p><strong>Email:</strong> <span id="email-display">${email}</span></p>
                </section>
                <section class="resume-section education">
                    <h2>Education</h2>
                    <p id="education-display">${education}</p>
                </section>
                <section class="resume-section skills">
                    <h2>Skills</h2>
                    <p id="skills-display">${skills.replace(/\n/g, '<br>')}</p>
                </section>
                <section class="resume-section work-experience">
                    <h2>Work Experience</h2>
                    <p id="work-experience-display">${workExperience.replace(/\n/g, '<br>')}</p>
                </section>
                <button id="edit-button" class="edit-button">Edit</button>
                <button type="button" id="share-button" class="share-button">Share</button>
                <button type="button" id="download-button" class="download-button">Download PDF</button>
            </div>`;

            resumeContainer.innerHTML = resumeContent;
            resumeContainer.style.display = "block"; // Show the resume container
            initializeEditButton();
            initializeShareButton();
            initializeDownloadButton();
        };

        const initializeDownloadButton = () => {
            const downloadButton = document.getElementById("download-button") as HTMLButtonElement | null;
            if (!downloadButton) return;

            downloadButton.addEventListener("click", () => {
                window.print(); // Opens the print dialog for downloading as PDF
            });
        };

        const initializeEditButton = () => {
            const editButton = document.getElementById("edit-button") as HTMLButtonElement | null;
            if (!editButton) return;

            editButton.addEventListener("click", () => {
                const nameDisplay = document.getElementById("name-display") as HTMLSpanElement;
                const contactDisplay = document.getElementById("contact-display") as HTMLSpanElement;
                const emailDisplay = document.getElementById("email-display") as HTMLSpanElement;
                const educationDisplay = document.getElementById("education-display") as HTMLParagraphElement;
                const skillsDisplay = document.getElementById("skills-display") as HTMLParagraphElement;
                const workExperienceDisplay = document.getElementById("work-experience-display") as HTMLParagraphElement;

                if (editButton.innerText === "Edit") {
                    nameDisplay.innerHTML = `<textarea>${nameDisplay.innerText}</textarea>`;
                    contactDisplay.innerHTML = `<textarea>${contactDisplay.innerText}</textarea>`;
                    emailDisplay.innerHTML = `<textarea>${emailDisplay.innerText}</textarea>`;
                    educationDisplay.innerHTML = `<textarea>${educationDisplay.innerText.replace(/<br>/g, '\n')}</textarea>`;
                    skillsDisplay.innerHTML = `<textarea>${skillsDisplay.innerText.replace(/<br>/g, '\n')}</textarea>`;
                    workExperienceDisplay.innerHTML = `<textarea>${workExperienceDisplay.innerText.replace(/<br>/g, '\n')}</textarea>`;
                    editButton.innerText = "Update";
                } else {
                    nameDisplay.innerText = (nameDisplay.querySelector('textarea') as HTMLTextAreaElement).value;
                    contactDisplay.innerText = (contactDisplay.querySelector('textarea') as HTMLTextAreaElement).value;
                    emailDisplay.innerText = (emailDisplay.querySelector('textarea') as HTMLTextAreaElement).value;
                    educationDisplay.innerHTML = (educationDisplay.querySelector('textarea') as HTMLTextAreaElement).value.replace(/\n/g, '<br>');
                    skillsDisplay.innerHTML = (skillsDisplay.querySelector('textarea') as HTMLTextAreaElement).value.replace(/\n/g, '<br>');
                    workExperienceDisplay.innerHTML = (workExperienceDisplay.querySelector('textarea') as HTMLTextAreaElement).value.replace(/\n/g, '<br>');
                    editButton.innerText = "Edit";
                }
            });
        };

        if (profilePic) {
            const reader = new FileReader();
            reader.onload = function (e) {
                generateResumeContent((e.target as FileReader).result as string);
            };
            reader.readAsDataURL(profilePic);
        } else {
            generateResumeContent(null);
        }
    });
});
