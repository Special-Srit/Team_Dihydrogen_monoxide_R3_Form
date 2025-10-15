const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwV_2L5nEDzJ2egFB82LLSMhRhYqA8DtGakwiu_V-A16NtSwxD9fl3w8-rtVzK-1t0s0w/exec";
        
        const form = document.getElementById('applicationForm');
        const submitBtn = document.getElementById('submitBtn');
        const messageDiv = document.getElementById('message');
        
        function showMessage(text, type) {
            messageDiv.textContent = text;
            messageDiv.className = `message ${type} show`;
            setTimeout(() => {
                messageDiv.classList.remove('show');
            }, 5000);
        }
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
            
            const formData = {
                applicant: document.getElementById('applicant').value,
                team: document.getElementById('team').value,
                role: document.getElementById('role').value,
                email: document.getElementById('email').value,
                phoneNumber: document.getElementById('phoneNumber').value,
                reason: document.getElementById('reason').value
            };
            
            try {
                const response = await fetch(SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                showMessage('Application submitted successfully! We will review your application and contact you soon.', 'success');
                form.reset();
                
            } catch (error) {
                showMessage('There was an error submitting your application. Please try again.', 'error');
                console.error('Error:', error);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Application';
            }
        });