$(document).ready(function() {
    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 1000);
        }
    });

    // Stats counter animation
    function animateStats() {
        $('.stat-number').each(function() {
            var $this = $(this);
            var targetValue = parseInt($this.data('value'));
            
            $({ Counter: 0 }).animate({
                Counter: targetValue
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.ceil(this.Counter));
                }
            });
        });
    }

    // Trigger stats animation when section is in viewport
    var statsAnimated = false;
    $(window).scroll(function() {
        if (!statsAnimated && isElementInViewport($('.stats-container'))) {
            animateStats();
            statsAnimated = true;
        }
    });

    // Contact form handling
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        this.reset();
    });

    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        var rect = el[0].getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
});