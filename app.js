// Personal Banking App JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // App state
    let isLoggedIn = false;

    // Initialize app
    initializeApp();

    function initializeApp() {
        // Check if user was previously logged in (simple simulation)
        const wasLoggedIn = localStorage.getItem('wowbank_logged_in') === 'true';
        
        if (wasLoggedIn) {
            loginUser();
        } else {
            showPublicView();
        }

        setupEventListeners();
        setupAccountWizard();
    }

    function showPublicView() {
        document.body.classList.remove('logged-in');
        // Show homepage section
        showSection('homepage');
    }

    function loginUser() {
        isLoggedIn = true;
        document.body.classList.add('logged-in');
        localStorage.setItem('wowbank_logged_in', 'true');
        
        // Show dashboard section
        showSection('dashboard');
        
        // Initialize logged-in functionality
        setupLoggedInFeatures();
        
        setTimeout(() => {
            showNotification('Welcome back to WowBank! Your account overview is ready.', 'success');
        }, 500);
    }

    function logoutUser() {
        isLoggedIn = false;
        document.body.classList.remove('logged-in');
        localStorage.removeItem('wowbank_logged_in');
        showPublicView();
        showNotification('Thank you for using WowBank!', 'success');
    }

    function showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeNavLink = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeNavLink) {
            activeNavLink.classList.add('active');
        }
    }

    function setupEventListeners() {
        // Public header buttons
        const loginBtn = document.querySelector('.btn-login');
        const signupBtn = document.querySelector('.btn-signup');
        const openAccountBtns = document.querySelectorAll('.btn-open-account');
        
        if (loginBtn) {
            loginBtn.addEventListener('click', openLoginModal);
        }
        
        if (signupBtn) {
            signupBtn.addEventListener('click', openAccountModal);
        }

        openAccountBtns.forEach(btn => {
            btn.addEventListener('click', openAccountModal);
        });

        // Login modal
        setupLoginModal();

        // Logout functionality
        const logoutBtn = document.querySelector('.btn-logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                if (confirm('Are you sure you want to sign out?')) {
                    logoutUser();
                }
            });
        }

        // Public navigation
        const publicNavLinks = document.querySelectorAll('.public-nav .nav-link');
        publicNavLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const section = this.getAttribute('data-section');
                
                switch(section) {
                    case 'about':
                        showNotification('About section coming soon!', 'info');
                        break;
                    case 'services':
                        showNotification('Services section coming soon!', 'info');
                        break;
                    case 'contact':
                        showNotification('Contact section coming soon!', 'info');
                        break;
                }
            });
        });
    }

    function setupLoginModal() {
        const modal = document.getElementById('loginModal');
        const loginForm = document.getElementById('loginForm');
        const closeBtn = document.querySelector('.close');

        if (closeBtn) {
            closeBtn.addEventListener('click', closeLoginModal);
        }

        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeLoginModal();
            }
        });

        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;

                // Simple demo authentication
                if ((username === 'demo@wowbank.com' || username === 'demo') && password === 'demo123') {
                    closeLoginModal();
                    loginUser();
                    loginForm.reset();
                } else {
                    showNotification('Invalid credentials. Try demo@wowbank.com / demo123', 'error');
                }
            });
        }
    }

    function openLoginModal() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.style.display = 'block';
            document.getElementById('username').focus();
        }
    }

    function closeLoginModal() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    function openAccountModal() {
        const modal = document.getElementById('accountModal');
        if (modal) {
            modal.style.display = 'block';
            resetAccountWizard();
        }
    }

    function closeAccountModal() {
        const modal = document.getElementById('accountModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    function resetAccountWizard() {
        // Reset to step 1
        document.querySelectorAll('.wizard-step').forEach(step => step.classList.remove('active'));
        document.getElementById('step1').classList.add('active');
        
        // Reset progress
        document.querySelectorAll('.progress-step').forEach(step => {
            step.classList.remove('active', 'completed');
        });
        document.querySelector('.progress-step').classList.add('active');
        
        // Reset navigation
        document.querySelector('.wizard-back').style.display = 'none';
        document.querySelector('.wizard-next').style.display = 'inline-block';
        document.querySelector('.wizard-submit').style.display = 'none';
        
        // Clear selections
        document.querySelectorAll('.account-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        currentStep = 1;
    }

    let currentStep = 1;

    function setupAccountWizard() {
        const modal = document.getElementById('accountModal');
        const closeBtn = document.querySelector('.close-account');
        const nextBtn = document.querySelector('.wizard-next');
        const backBtn = document.querySelector('.wizard-back');
        const submitBtn = document.querySelector('.wizard-submit');

        if (closeBtn) {
            closeBtn.addEventListener('click', closeAccountModal);
        }

        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeAccountModal();
            }
        });

        // Account option selection
        document.querySelectorAll('.account-option').forEach(option => {
            option.addEventListener('click', function() {
                document.querySelectorAll('.account-option').forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
            });
        });

        // Navigation buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                console.log('Next button clicked, currentStep:', currentStep);
                // Check if account type is selected on step 1
                if (currentStep === 1) {
                    const selectedAccount = document.querySelector('.account-option.selected');
                    console.log('Selected account:', selectedAccount);
                    if (!selectedAccount) {
                        showNotification('Please select an account type to continue', 'error');
                        return;
                    }
                    // Allow progression from step 1 to step 2
                    currentStep++;
                    console.log('Moving to step:', currentStep);
                    updateWizardStep();
                } else if (currentStep > 1) {
                    // Navigate backward on subsequent screens
                    currentStep--;
                    console.log('Moving backward to step:', currentStep);
                    updateWizardStep();
                }
            });
        }

        if (backBtn) {
            backBtn.addEventListener('click', function() {
                if (currentStep > 1) {
                    currentStep--;
                    updateWizardStep();
                }
            });
        }

        if (submitBtn) {
            submitBtn.addEventListener('click', function() {
                showNotification('Account application submitted! We\'ll contact you within 24 hours.', 'success');
                closeAccountModal();
            });
        }
    }

    function updateWizardStep() {
        // Hide all steps
        document.querySelectorAll('.wizard-step').forEach(step => step.classList.remove('active'));
        
        // Show current step
        document.getElementById(`step${currentStep}`).classList.add('active');
        
        // Update progress indicators
        document.querySelectorAll('.progress-step').forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index + 1 < currentStep) {
                step.classList.add('completed');
            } else if (index + 1 === currentStep) {
                step.classList.add('active');
            }
        });
        
        // Update navigation buttons
        const backBtn = document.querySelector('.wizard-back');
        const nextBtn = document.querySelector('.wizard-next');
        const submitBtn = document.querySelector('.wizard-submit');
        
        backBtn.style.display = currentStep > 1 ? 'inline-block' : 'none';
        
        if (currentStep === 3) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }
    }

    function setupLoggedInFeatures() {
        // Navigation functionality for logged-in users
        const navLinks = document.querySelectorAll('.logged-in-header .nav-link');
        const sections = document.querySelectorAll('.section');

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all nav links and sections
                navLinks.forEach(nav => nav.classList.remove('active'));
                sections.forEach(section => section.classList.remove('active'));
                
                // Add active class to clicked nav link
                this.classList.add('active');
                
                // Show corresponding section
                const targetSection = this.getAttribute('data-section');
                document.getElementById(targetSection).classList.add('active');
            });
        });

    // Quick actions functionality
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            
            switch(action) {
                case 'transfer':
                    // Switch to transfer section
                    navLinks.forEach(nav => nav.classList.remove('active'));
                    sections.forEach(section => section.classList.remove('active'));
                    document.querySelector('[data-section="transfer"]').classList.add('active');
                    document.getElementById('transfer').classList.add('active');
                    break;
                case 'pay-bills':
                    showNotification('Bill Pay feature coming soon!', 'info');
                    break;
                case 'deposit':
                    showNotification('Mobile Deposit feature coming soon!', 'info');
                    break;
                case 'statements':
                    showNotification('Statements feature coming soon!', 'info');
                    break;
            }
        });
    });

    // Transfer form functionality
    const transferForm = document.getElementById('transferForm');
    const transferDateInput = document.getElementById('transferDate');
    
    // Set default transfer date to today
    const today = new Date().toISOString().split('T')[0];
    transferDateInput.value = today;

    transferForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fromAccount = document.getElementById('fromAccount').value;
        const toAccount = document.getElementById('toAccount').value;
        const amount = document.getElementById('amount').value;
        const memo = document.getElementById('memo').value;
        const transferDate = document.getElementById('transferDate').value;

        // Validation
        if (!fromAccount || !toAccount || !amount) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        if (fromAccount === toAccount) {
            showNotification('Cannot transfer to the same account', 'error');
            return;
        }

        if (parseFloat(amount) <= 0) {
            showNotification('Transfer amount must be greater than $0', 'error');
            return;
        }

        // Simulate transfer processing
        const transferBtn = document.querySelector('.transfer-btn');
        const originalText = transferBtn.textContent;
        transferBtn.textContent = 'Processing...';
        transferBtn.disabled = true;

        setTimeout(() => {
            // Reset form
            transferForm.reset();
            transferDateInput.value = today;
            
            // Reset button
            transferBtn.textContent = originalText;
            transferBtn.disabled = false;
            
            // Show success message
            showNotification(`Transfer of $${amount} scheduled successfully!`, 'success');
            
            // Update recent activity (simulate)
            addRecentTransaction(fromAccount, toAccount, amount, memo);
            
        }, 2000);
    });

    // Account actions
    const accountActions = document.querySelectorAll('.account-actions button');
    accountActions.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            
            switch(action) {
                case 'View Transactions':
                    showNotification('Transaction history feature coming soon!', 'info');
                    break;
                case 'Transfer Funds':
                    // Switch to transfer section
                    navLinks.forEach(nav => nav.classList.remove('active'));
                    sections.forEach(section => section.classList.remove('active'));
                    document.querySelector('[data-section="transfer"]').classList.add('active');
                    document.getElementById('transfer').classList.add('active');
                    break;
                case 'View Holdings':
                    showNotification('Investment holdings feature coming soon!', 'info');
                    break;
                case 'Make Investment':
                    showNotification('Investment feature coming soon!', 'info');
                    break;
            }
        });
    });

    // Profile form interactions
    const profileButtons = document.querySelectorAll('.profile-card button');
    profileButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            showNotification(`${action} feature coming soon!`, 'info');
        });
    });

        // Already handled in main setupEventListeners function

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '600',
            zIndex: '1000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '400px',
            wordWrap: 'break-word'
        });

        // Set background color based on type
        switch(type) {
            case 'success':
                notification.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
                break;
            case 'error':
                notification.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
                break;
            case 'info':
            default:
                notification.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
                break;
        }

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 4 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 4000);

        // Click to dismiss
        notification.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        });
    }

    // Add recent transaction (simulation)
    function addRecentTransaction(fromAccount, toAccount, amount, memo) {
        const transactionList = document.querySelector('.transaction-list');
        const newTransaction = document.createElement('div');
        newTransaction.className = 'transaction';
        
        const accountNames = {
            'checking': 'Premium Checking',
            'savings': 'High-Yield Savings',
            'external': 'External Account'
        };

        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });

        newTransaction.innerHTML = `
            <div class="transaction-icon">
                <i class="fas fa-exchange-alt"></i>
            </div>
            <div class="transaction-details">
                <span class="merchant">Transfer to ${accountNames[toAccount] || 'External Account'}</span>
                <span class="date">Today, ${timeString}</span>
            </div>
            <span class="amount debit">-$${amount}</span>
        `;

        // Add animation
        newTransaction.style.opacity = '0';
        newTransaction.style.transform = 'translateY(-20px)';
        
        transactionList.insertBefore(newTransaction, transactionList.firstChild);
        
        // Animate in
        setTimeout(() => {
            newTransaction.style.transition = 'all 0.3s ease';
            newTransaction.style.opacity = '1';
            newTransaction.style.transform = 'translateY(0)';
        }, 100);

        // Remove oldest transaction if more than 5
        const transactions = transactionList.querySelectorAll('.transaction');
        if (transactions.length > 5) {
            transactions[transactions.length - 1].remove();
        }
    }

        // Add interactive effects for logged-in features
        addInteractiveEffects();
        
        // Form validation improvements
        setupFormValidation();
        
        // Keyboard shortcuts
        setupKeyboardShortcuts();
    }

    function addInteractiveEffects() {
        const accountCards = document.querySelectorAll('.account-card');
        accountCards.forEach(card => {
            card.addEventListener('click', function() {
                // Add subtle click effect
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }

    function setupFormValidation() {
        const amountInput = document.getElementById('amount');
        if (amountInput) {
            amountInput.addEventListener('input', function() {
                const value = parseFloat(this.value);
                if (value > 50000) {
                    showNotification('Large transfers may require additional verification', 'info');
                }
            });
        }
    }

    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            if (e.altKey && isLoggedIn) {
                switch(e.key) {
                    case '1':
                        e.preventDefault();
                        showSection('dashboard');
                        break;
                    case '2':
                        e.preventDefault();
                        showSection('accounts');
                        break;
                    case '3':
                        e.preventDefault();
                        showSection('transfer');
                        break;
                    case '4':
                        e.preventDefault();
                        showSection('profile');
                        break;
                }
            }
        });
    }
});
