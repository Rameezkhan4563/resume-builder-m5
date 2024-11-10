document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("resume-form");
    var resumeContainer = document.getElementById("resume-container");
    if (!form || !resumeContainer) {
        console.error("Form or Resume container not found.");
        return;
    }
    form.addEventListener("submit", function (event) {
        var _a;
        event.preventDefault(); // Prevent form from reloading
        var nameElement = document.getElementById("name");
        var contactElement = document.getElementById("contact");
        var emailElement = document.getElementById("email");
        var educationElement = document.getElementById("education");
        var skillsElement = document.getElementById("skills");
        var workExperienceElement = document.getElementById("work-experience");
        var profilePicElement = document.getElementById("profile-pic");
        var name = (nameElement === null || nameElement === void 0 ? void 0 : nameElement.value) || "";
        var contact = (contactElement === null || contactElement === void 0 ? void 0 : contactElement.value) || "";
        var email = (emailElement === null || emailElement === void 0 ? void 0 : emailElement.value) || "";
        var education = (educationElement === null || educationElement === void 0 ? void 0 : educationElement.value) || "";
        var skills = (skillsElement === null || skillsElement === void 0 ? void 0 : skillsElement.value) || "";
        var workExperience = (workExperienceElement === null || workExperienceElement === void 0 ? void 0 : workExperienceElement.value) || "";
        var profilePic = ((_a = profilePicElement === null || profilePicElement === void 0 ? void 0 : profilePicElement.files) === null || _a === void 0 ? void 0 : _a[0]) || null;
        console.log("Form data collected:", { name: name, contact: contact, email: email, education: education, skills: skills, workExperience: workExperience });
        // Hide the form
        form.style.display = "none";
        resumeContainer.innerHTML = "";
        var initializeShareButton = function () {
            var shareButton = document.getElementById("share-button");
            if (!shareButton)
                return;
            shareButton.addEventListener("click", function () {
                var resumeUrl = "https://your-resume-link.com"; // Replace this with the actual URL if available
                navigator.clipboard.writeText(resumeUrl).then(function () {
                    alert("Resume link copied to clipboard!");
                }).catch(function (err) {
                    console.error("Failed to copy resume link: ", err);
                });
            });
        };
        var generateResumeContent = function (profileImageUrl) {
            var resumeContent = "\n                <div class=\"resume animated-fadeIn\">\n                    <h1 class=\"resume-title\">Resume</h1>\n                    <section class=\"resume-section personal-info\">\n            ";
            if (profileImageUrl) {
                resumeContent += "\n                    <img src=\"".concat(profileImageUrl, "\" alt=\"Profile Picture\" class=\"profile-pic animated-bounceIn\" />\n                ");
            }
            else {
                resumeContent += "<p>No profile picture uploaded.</p>";
            }
            resumeContent += "\n                    <p><strong>Name:</strong> <span id=\"name-display\">".concat(name, "</span></p>\n                    <p><strong>Contact Number:</strong> <span id=\"contact-display\">").concat(contact, "</span></p>\n                    <p><strong>Email:</strong> <span id=\"email-display\">").concat(email, "</span></p>\n                </section>\n                <section class=\"resume-section education\">\n                    <h2>Education</h2>\n                    <p id=\"education-display\">").concat(education, "</p>\n                </section>\n                <section class=\"resume-section skills\">\n                    <h2>Skills</h2>\n                    <p id=\"skills-display\">").concat(skills.replace(/\n/g, '<br>'), "</p>\n                </section>\n                <section class=\"resume-section work-experience\">\n                    <h2>Work Experience</h2>\n                    <p id=\"work-experience-display\">").concat(workExperience.replace(/\n/g, '<br>'), "</p>\n                </section>\n                <button id=\"edit-button\" class=\"edit-button\">Edit</button>\n                <button type=\"button\" id=\"share-button\" class=\"share-button\">Share</button>\n                <button type=\"button\" id=\"download-button\" class=\"download-button\">Download PDF</button>\n            </div>");
            resumeContainer.innerHTML = resumeContent;
            resumeContainer.style.display = "block"; // Show the resume container
            initializeEditButton();
            initializeShareButton();
            initializeDownloadButton();
        };
        var initializeDownloadButton = function () {
            var downloadButton = document.getElementById("download-button");
            if (!downloadButton)
                return;
            downloadButton.addEventListener("click", function () {
                window.print(); // Opens the print dialog for downloading as PDF
            });
        };
        var initializeEditButton = function () {
            var editButton = document.getElementById("edit-button");
            if (!editButton)
                return;
            editButton.addEventListener("click", function () {
                var nameDisplay = document.getElementById("name-display");
                var contactDisplay = document.getElementById("contact-display");
                var emailDisplay = document.getElementById("email-display");
                var educationDisplay = document.getElementById("education-display");
                var skillsDisplay = document.getElementById("skills-display");
                var workExperienceDisplay = document.getElementById("work-experience-display");
                if (editButton.innerText === "Edit") {
                    nameDisplay.innerHTML = "<textarea>".concat(nameDisplay.innerText, "</textarea>");
                    contactDisplay.innerHTML = "<textarea>".concat(contactDisplay.innerText, "</textarea>");
                    emailDisplay.innerHTML = "<textarea>".concat(emailDisplay.innerText, "</textarea>");
                    educationDisplay.innerHTML = "<textarea>".concat(educationDisplay.innerText.replace(/<br>/g, '\n'), "</textarea>");
                    skillsDisplay.innerHTML = "<textarea>".concat(skillsDisplay.innerText.replace(/<br>/g, '\n'), "</textarea>");
                    workExperienceDisplay.innerHTML = "<textarea>".concat(workExperienceDisplay.innerText.replace(/<br>/g, '\n'), "</textarea>");
                    editButton.innerText = "Update";
                }
                else {
                    nameDisplay.innerText = nameDisplay.querySelector('textarea').value;
                    contactDisplay.innerText = contactDisplay.querySelector('textarea').value;
                    emailDisplay.innerText = emailDisplay.querySelector('textarea').value;
                    educationDisplay.innerHTML = educationDisplay.querySelector('textarea').value.replace(/\n/g, '<br>');
                    skillsDisplay.innerHTML = skillsDisplay.querySelector('textarea').value.replace(/\n/g, '<br>');
                    workExperienceDisplay.innerHTML = workExperienceDisplay.querySelector('textarea').value.replace(/\n/g, '<br>');
                    editButton.innerText = "Edit";
                }
            });
        };
        if (profilePic) {
            var reader = new FileReader();
            reader.onload = function (e) {
                generateResumeContent(e.target.result);
            };
            reader.readAsDataURL(profilePic);
        }
        else {
            generateResumeContent(null);
        }
    });
});
