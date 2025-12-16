document.addEventListener('DOMContentLoaded', function() {
    // Loader
    const loader = document.querySelector('.loader');
    
    // Hide loader when page is fully loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    });

    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Scroll animations for fade-in elements
    function setupScrollAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(el => observer.observe(el));
    }

    // Header scroll effect - hide on scroll down, show on scroll up
    function setupHeaderScroll() {
        const header = document.querySelector('header');
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.classList.remove('hidden');
                return;
            }
            
            if (currentScroll > lastScroll && !header.classList.contains('hidden')) {
                header.classList.add('hidden');
            } else if (currentScroll < lastScroll && header.classList.contains('hidden')) {
                header.classList.remove('hidden');
            }
            
            lastScroll = currentScroll;
        });
    }

    // Smooth scrolling for anchor links
    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    document.querySelectorAll('nav a').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            });
        });
    }

    // Back to top button
    function setupBackToTop() {
        const backToTop = document.querySelector('.back-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Update active nav link on scroll
    function setupActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Particles.js initialization
    function initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#ffffff"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        }
                    },
                    "opacity": {
                        "value": 0.3,
                        "random": false
                    },
                    "size": {
                        "value": 3,
                        "random": true
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#ffffff",
                        "opacity": 0.2,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": false,
                        "out_mode": "out"
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        }
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "push": {
                            "particles_nb": 4
                        }
                    }
                },
                "retina_detect": true
            });
        }
    }

    // Initialize all effects
    setupScrollAnimations();
    setupHeaderScroll();
    setupSmoothScrolling();
    setupBackToTop();
    setupActiveNavLink();
    
    // Initialize particles after page load
    window.addEventListener('load', () => {
        initParticles();
    });

    // Add floating class to elements that should float
    const floatingElements = document.querySelectorAll('.logo, .feature-icon');
    floatingElements.forEach(el => el.classList.add('floating'));
    
    // Add glow effect to buttons and cards
    const glowElements = document.querySelectorAll('.btn, .post-card, .feature-card, .team-card');
    glowElements.forEach(el => el.classList.add('glow'));

    /* ---------- i18n: simple translation system ---------- */
    const translations = {
        ru: {
            'site.title': 'Aetheris Sandbox',
            'nav.home': 'Главная',
            'nav.news': 'Новости',
            'nav.faq': 'FAQ',
            'nav.studio': 'Nelik Studio',
            'hero.title': 'Исследуйте Aetheris Sandbox',
            'hero.desc': 'Минималистичная песочница с акцентом на свободу творчества и строительства.',
            'btn.news': 'Новости',
            'btn.discord': 'Discord',
            'features.title': 'Ключевые возможности',
            'features.subtitle': 'Что делает Aetheris Sandbox уникальным',
            'feature.dev': 'Активные разработчики',
            'feature.dev_text': 'Поддержка игры и разработка новых механик будет продолжаться еще долгое время.',
            'feature.build': 'Система строительства',
            'feature.build_text': 'Стройте и изменяйте карту вокруг себя с помощью различных инструментов.',
            'feature.multiplayer': 'Мультиплеер',
            'feature.multiplayer_text': 'Играйте с друзьями или присоединяйтесь к сообществу создателей.',
            'feature.freedom': 'Полная свобода действий',
            'feature.freedom_text': 'Делайте что угодно, развлекайтесь и просто получайте удовольствие.',
            '404.title': 'Безграничная пустота',
            'meta.title.404': 'Страница не найдена - Aetheris Sandbox',
            '404.desc': 'Страница, которую вы ищете, была удалена или никогда не существовала в этой вселенной.',
            '404.btn.home': 'Вернуться на главную',
            '404.btn.discord': 'Наш Discord',
            'update.badge': 'Обновление',
            'update.chat_title': 'Чат & Команды',
            'update.date': '9 августа 2025',
            'update.author': 'Автор: Lelik',
            'update.chat_heading': 'Чат',
            'update.chat_desc': 'Добавлен чат, для общения с другими игроками:',
            'update.featured_alt': 'Чат и команды - скриншот',
            'update.commands_heading': 'Команды',
            'update.commands_desc': 'Система команд, для активации откройте чат и начните сообщение с / :',
            'update.added_heading': 'Добавлено',
            'update.added_desc': 'Что добавлено еще:',
            'update.back_to_news': 'Назад к новостям',
            'footer.copyright': '© 2025 Nelik Studio. Aetheris Sandbox - все права защищены.',
            'posts.title': 'Последние обновления',
            'posts.subtitle': 'Следите за развитием проекта',
            'meta.description': 'Aetheris Sandbox — минималистичная многопользовательская игра-песочница с системой строительства, автомобилями и свободой творчества. Присоединяйся к бета-тесту!',
            'meta.keywords': 'Aetheris Sandbox, игра-песочница, строительство, автомобили, мультиплеер, indie, Nelik Studio',
            'badge.new': 'Новое',
            'post1.img_alt': 'Игровой мир',
            'post2.img_alt': 'Игровой мир',
            'post3.img_alt': 'Игровой мир',
            'post4.img_alt': 'Игровой мир',
            'post5.img_alt': 'Игровой мир',
            'post6.img_alt': 'Игровой мир',
            'post1.date': '20 Сентября 2025',
            'post1.title': 'Комнаты & Перекраска',
            'post1.text': 'Была добавлена система комнат, покраска автомобилей, воспроизведен небольшой фикс багов. Небольшое улучшение графики.',
            'post1.tag': 'Обновление',
            'post2.date': '9 августа 2025',
            'post2.title': 'Чат & Команды',
            'post2.text': 'В новом обновлении появился чат, команды а также различное множество нововведений! Читайте дальше...',
            'post2.tag': 'Большое Обновление',
            'post3.date': '5 июля 2025',
            'post3.title': 'Оружие & Интерьеры',
            'post3.text': 'Новое обновление принесло в игру: оружие, систему перемещения в интерьеры, ремейк персонажа, обновленный HUD здоровья, а также много технических доработок!',
            'post3.tag': 'Большое Обновление',
            'post4.date': '13 июня 2025',
            'post4.title': 'Обновление света для автомобилей',
            'post4.text': 'Новое обновление принесло в игру: фары для автомобилей, аварийные стоп сигналы и мигалки для служебного транспорта, новый спидометр и индикаторы!',
            'post4.tag': 'Обновление',
            'post5.date': '10 мая 2025',
            'post5.title': 'Автомобильное Обновление',
            'post5.text': 'Вышло новое обновление, в котором было добавлено: Автомобили, обновленное главное меню, HUD Здоровья и новые пропы!',
            'post5.tag': 'Большое Обновление',
            'post6.date': '27 апреля 2025',
            'post6.title': 'Запуск сайта',
            'post6.text': 'Долгожданный момент настал — мы запускаем сайт, где вы сможете найти всё самое важное о мире Aetheris. Здесь будут публиковаться последние новости, анонсы обновлений.',
            'post6.tag': 'Сайт',
            'post0.date': '16 декабря 2025',
            'post0.title': 'Закрытое Бета Тестирование',
            'post0.text': 'Новое оружие АК, улучшенная физика автомобилей, смена времени суток, погоды, графика с Ambient Occlusion и многое другое!',
            'post0.tag': 'Большое Обновление',
            'post0.img_alt': 'Крупное обновление',
            'studio.title': 'Nelik Studio',
            'studio.subtitle': 'Команда разработчиков и их Discord',
            'studio.category_dev': 'Разработка Aetheris Sandbox',
            'studio.category_others': 'Другие участники студии',
            'team.lelik.role': 'Главный разработчик',
            'team.lelik.desc': 'Программирование, дизайн игры, архитектура проекта',
            'team.lelik.handle': '@l_e_l_i_k',
            'team.tim.role': '3D Моделлер',
            'team.tim.desc': 'Создание 3D моделей и визуальных элементов',
            'team.tim.handle': '@crab2008',
            'team.noname.role': 'Game Support',
            'team.noname.desc': 'Поддержка игрового комьюнити и модерация дискорд сервера',
            'team.noname.handle': '@nouneim0094',
            'team.darno.role': 'Дизайнер',
            'team.darno.desc': 'Рисование UI элементов, 2D текстур, Pixel-Art',
            'team.darno.handle': '@darno_',
            'faq.title': 'Частые вопросы',
            'faq.subtitle': 'Все, что вам нужно знать',
            'faq.q1.q': 'Что такое Aetheris Sandbox?',
            'faq.q1.a': 'Это минималистичная игровая песочница, где вы можете создавать, ездить на автомобилях и взаимодействовать с окружающими вас игроками.',
            'faq.q2.q': 'На каких платформах доступна игра?',
            'faq.q2.a': 'В настоящее время игра доступна только на PC (Windows).',
            'faq.q3.q': 'Когда выйдет игра?',
            'faq.q3.a': 'Первое закрытое бета-тестирование планируется осенью 2025 года.'
            ,
            /* chat-command page */
            'chat.li.join_leave': 'При заходе / выходе игрока в чат выводится соответвующее сообщение',
            'chat.li.activate_key': 'Чат можно активировать на букву T',
            'cmd.create': '/create [prop / car] [название] - создает объект перед игроком',
            'cmd.delete': '/delete [prop / car] [кол-во] - удаляет последние созданные объекты / автомобили (только если внутри нет игрока)',
            'cmd.tp': '/tp [имя_игрока] - телепортирует вас к выбранному игроку',
            'cmd.kick': 'Дополнительно: теперь у каждого игрока в паузе (если вы являетесь хостом) есть кнопка Kick, позволяющая выгнать игрока с сервера',
            'chat.added.fall_damage': 'Урон от падения',
            'chat.added.copy_nick': 'Копирование никнейма по нажатию на слот',
            'chat.added.spawn_buttons': 'Кнопки для выбора типов пропов в панели спавна',
            'chat.added.interaction_panel': 'Теперь если с объектом можно взаимодействовать, слева будет панель указывающая на это',
            'chat.added.hide_ui': 'Интерфейс теперь можно скрывать',
            'chat.gallery1': 'Чат',
            'chat.gallery2': 'Система кика',
            'chat.gallery1_img': 'Скриншот чата',
            'chat.gallery2_img': 'Скриншот системы кика',
            /* rooms_update page */
            'rooms.heading.rooms': 'Комнаты',
            'rooms.desc.rooms': 'Добавлены комнаты:',
            'rooms.li.create_room': 'Каждый игрок может создать свою комнату, указав название, пароль и кол-во игроков',
            'rooms.li.steam': 'Комнаты реализованы через сервис Steam',
            'rooms.heading.repaint': 'Перекраска автомобилей',
            'rooms.desc.repaint': 'Подъехав к мастерской вы сможете перекрасить ваш автомобиль в любой цвет',
            'rooms.li.rgb': 'Перекраска производится с помощью RGB панели',
            'rooms.heading.added': 'Добавлено',
            'rooms.desc.added': 'Что добавлено еще:',
            'rooms.added.help': 'Команда /help',
            'rooms.added.rs3': 'Новый автомобилль RS3',
            'rooms.added.ps': 'p.s сайт был переведен на домен aetheris-sandbox.ru',
            'rooms.gallery1': 'Система комнат',
            'rooms.gallery2': 'Система покраски автомобилей',
            'rooms.gallery1_img': 'Скриншот системы комнат',
            'rooms.gallery2_img': 'Скриншот системы покраски',
            'update.rooms_title': 'Комнаты & Перекраска',
            /* weapons-interiors page */
            'weapons.heading.system': 'Новая система оружия',
            'weapons.desc.system': 'Мы добавили систему стрельбы, оружия и много прочего:',
            'weapons.li.fire_modes': 'Разные режимы стрельбы',
            'weapons.li.hit_effects': 'Эффекты попадания',
            'weapons.li.script': 'Функциональный скрипт, для добавления различных оружий',
            'weapons.heading.interiors': 'Интерьеры зданий',
            'weapons.li.enter_buildings': 'Добавлена система, позволяющая заходить в некоторые здания',
            'weapons.li.build_inside': 'Внутри зданий можно строить и взаимодействовать с объектами',
            'weapons.li.save_changes': 'Реализована система сохранения изменений в интерьерах',
            'weapons.heading.misc': 'Прочие улучшения',
            'weapons.li.physics': 'Улучшенная физика объектов',
            'weapons.li.hud': 'Обновленный HUD здоровья',
            'weapons.li.model': 'Модель старого персонажа была изменена',
            'weapons.li.optim': 'Оптимизация производительности',
            'weapons.gallery1': 'Новая система оружия в действии',
            'weapons.gallery2': 'Пример интерьера здания'
            , 'weapons.gallery1_img': 'Скриншот оружия',
            'weapons.gallery2_img': 'Скриншот интерьера',
            'update.weapons_title': 'Оружие & Интерьеры',
            /* major-update page */
            'update.major_title': 'Закрытое Бета Тестирование',
            'major.intro': 'Успешно завершилось закрытое бета-тестирование с участием пятерки тестировщиков. Несмотря на выявленные проблемы, команда активно работает над их устранением. Протестирован и доработан весь новый контент, описанный ниже.',
            'major.heading.weapons': 'Новое оружие: АК',
            'major.desc.weapons': 'Добавлено новое оружие с полной реализацией механики:',
            'major.li.recoil': 'Отдача при стрельбе',
            'major.li.spread': 'Реалистичный разброс выстрелов',
            'major.li.shells': 'Визуализация вылетающих гильз',
            'major.li.bullet_holes': 'Видимые дыры от пуль в окружении',
            'major.li.anim_inspect': 'Анимация осмотра оружия',
            'major.li.anim_reload': 'Анимация перезарядки',
            'major.heading.vehicles': 'Улучшения автомобилей',
            'major.li.physics': 'Полностью переработана физика автомобилей',
            'major.li.spawn': 'Машины можно спавнить из панели спавна',
            'major.li.health': 'Новая система хп для автомобилей',
            'major.li.crush': 'Теперь машинами можно раздавить игрока',
            'major.li.lights': 'Доработанная система мигалок',
            'major.li.mud': 'Грязь от колёс машины по грязи',
            'major.heading.world': 'Окружение и атмосфера',
            'major.li.skybox': 'Новая заставка Nelik Studio',
            'major.li.day_time': 'Смена времени суток (Утро-День-Вечер-Ночь)',
            'major.li.custom_skybox': 'Новый кастомный Skybox',
            'major.li.weather': 'Смена погоды (Облачно-Безоблачно-Дождь-Туман)',
            'major.heading.graphics': 'Графика',
            'major.li.ambient_occlusion': 'Ambient Occlusion (Полностью переработана графика)',
            'major.heading.audio': 'Звук',
            'major.li.footsteps': 'Звуки ходьбы персонажа (зависит от типа поверхности)',
            'major.li.surface_sounds': 'Звук ходьбы теперь зависит от слоя объекта',
            'major.heading.gameplay': 'Игровые механики',
            'major.li.physics_impulse': 'Некоторые объекты получают физический импульс от попадания оружием',
            'major.li.build_system': 'Обновленная система строительства',
            'major.li.ragdoll': 'Рэгдолл персонажа при смерти',
            'major.gallery1': 'Новое оружие АК в действии',
            'major.gallery2': 'Улучшенная физика автомобилей',
            'major.gallery3': 'Динамическая смена времени суток',
            'major.gallery1_img': 'Скриншот оружия',
            'major.gallery2_img': 'Скриншот автомобилей',
            'major.gallery3_img': 'Скриншот времени суток',
        },
        en: {
            'site.title': 'Aetheris Sandbox',
            'nav.home': 'Home',
            'nav.news': 'News',
            'nav.faq': 'FAQ',
            'nav.studio': 'Nelik Studio',
            'hero.title': 'Explore Aetheris Sandbox',
            'hero.desc': 'A minimalist sandbox focused on creative freedom and construction.',
            'btn.news': 'News',
            'btn.discord': 'Discord',
            'features.title': 'Key Features',
            'features.subtitle': 'What makes Aetheris Sandbox unique',
            'feature.dev': 'Active Developers',
            'feature.dev_text': 'Ongoing support and new mechanics development for the game.',
            'feature.build': 'Building System',
            'feature.build_text': 'Construct and change the map around you using various tools.',
            'feature.multiplayer': 'Multiplayer',
            'feature.multiplayer_text': 'Play with friends or join the community of creators.',
            'feature.freedom': 'Complete Freedom',
            'feature.freedom_text': 'Do what you want, have fun, and enjoy.',
            '404.title': 'Endless Void',
            'meta.title.404': 'Page not found - Aetheris Sandbox',
            '404.desc': 'The page you are looking for has been removed or never existed in this universe.',
            '404.btn.home': 'Return Home',
            '404.btn.discord': 'Our Discord',
            'update.badge': 'Update',
            'update.chat_title': 'Chat & Commands',
            'update.date': '9 August 2025',
            'update.author': 'Author: Lelik',
            'update.chat_heading': 'Chat',
            'update.chat_desc': 'Added chat for communicating with other players:',
            'update.featured_alt': 'Chat & Commands screenshot',
            'update.commands_heading': 'Commands',
            'update.commands_desc': 'Command system: open chat and start a message with / :',
            'update.added_heading': 'Added',
            'update.added_desc': 'Also added:',
            'update.back_to_news': 'Back to news',
            'footer.copyright': '© 2025 Nelik Studio. Aetheris Sandbox - all rights reserved.',
            'posts.title': 'Latest updates',
            'posts.subtitle': 'Follow the project development',
            'meta.description': 'Aetheris Sandbox — a minimalist multiplayer sandbox game with building system, vehicles and creative freedom. Join the beta test!',
            'meta.keywords': 'Aetheris Sandbox, sandbox game, building, vehicles, multiplayer, indie, Nelik Studio',
            'badge.new': 'New',
            'post1.img_alt': 'Game world',
            'post2.img_alt': 'Game world',
            'post3.img_alt': 'Game world',
            'post4.img_alt': 'Game world',
            'post5.img_alt': 'Game world',
            'post6.img_alt': 'Game world',
            'post1.date': '20 September 2025',
            'post1.title': 'Rooms & Repaint',
            'post1.text': 'Added room system, car repainting, small bugfixes and slight graphics improvements.',
            'post1.tag': 'Update',
            'post2.date': '9 August 2025',
            'post2.title': 'Chat & Commands',
            'post2.text': 'The new update added chat, commands and many other features! Read on...',
            'post2.tag': 'Major Update',
            'post3.date': '5 July 2025',
            'post3.title': 'Weapons & Interiors',
            'post3.text': 'This update introduced weapons, interior entering system, character remake, updated health HUD and many technical improvements!',
            'post3.tag': 'Major Update',
            'post4.date': '13 June 2025',
            'post4.title': 'Car lighting update',
            'post4.text': 'This update added car headlights, brake lights, emergency lights for service vehicles, new speedometer and indicators!',
            'post4.tag': 'Update',
            'post5.date': '10 May 2025',
            'post5.title': 'Vehicle Update',
            'post5.text': 'A new update added vehicles, updated main menu, health HUD and new props!',
            'post5.tag': 'Major Update',
            'post6.date': '27 April 2025',
            'post6.title': 'Site Launch',
            'post6.text': 'The long-awaited moment has come — we are launching the site where you can find everything important about the world of Aetheris. News and update announcements will be published here.',
            'post6.tag': 'Site',
            'post0.date': '16 December 2025',
            'post0.title': 'Closed Beta Testing',
            'post0.text': 'New AK weapon, improved vehicle physics, day/night cycle, weather system, graphics with Ambient Occlusion and much more!',
            'post0.tag': 'Major Update',
            'post0.img_alt': 'Major update',
            'studio.title': 'Nelik Studio',
            'studio.subtitle': 'The development team and their Discord',
            'studio.category_dev': 'Aetheris Sandbox development',
            'studio.category_others': 'Other studio members',
            'team.lelik.role': 'Lead Developer',
            'team.lelik.desc': 'Programming, game design, project architecture',
            'team.lelik.handle': '@l_e_l_i_k',
            'team.tim.role': '3D Modeler',
            'team.tim.desc': 'Creating 3D models and visual assets',
            'team.tim.handle': '@crab2008',
            'team.noname.role': 'Game Support',
            'team.noname.desc': 'Community support and Discord moderation',
            'team.noname.handle': '@nouneim0094',
            'team.darno.role': 'Designer',
            'team.darno.desc': 'UI elements, 2D textures, Pixel-Art',
            'team.darno.handle': '@darno_',
            'faq.title': 'Frequently Asked Questions',
            'faq.subtitle': 'Everything you need to know',
            'faq.q1.q': 'What is Aetheris Sandbox?',
            'faq.q1.a': 'A minimalist game sandbox where you can create, drive cars, and interact with other players around you.',
            'faq.q2.q': 'On which platforms is the game available?',
            'faq.q2.a': 'Currently the game is available only on PC (Windows).',
            'faq.q3.q': 'When will the game be released?',
            'faq.q3.a': 'The first closed beta test is planned for Autumn 2025.'
            ,
            /* chat-command page */
            'chat.li.join_leave': 'Join/leave messages are shown in chat when players enter or leave',
            'chat.li.activate_key': 'Open chat by pressing the T key',
            'cmd.create': '/create [prop / car] [name] - creates an object in front of the player',
            'cmd.delete': '/delete [prop / car] [amount] - deletes the last created objects / cars (only if no player is inside)',
            'cmd.tp': '/tp [player_name] - teleports you to the selected player',
            'cmd.kick': 'Additionally: hosts have a Kick button in the pause menu to remove a player from the server',
            'chat.added.fall_damage': 'Fall damage',
            'chat.added.copy_nick': 'Copy nickname by clicking on the slot',
            'chat.added.spawn_buttons': 'Buttons to select prop types in the spawn panel',
            'chat.added.interaction_panel': 'If an object is interactable, a panel will appear on the left indicating this',
            'chat.added.hide_ui': 'The UI can now be hidden',
            'chat.gallery1': 'Chat',
            'chat.gallery2': 'Kick system',
            'chat.gallery1_img': 'Chat screenshot',
            'chat.gallery2_img': 'Kick system screenshot',
            /* rooms_update page */
            'rooms.heading.rooms': 'Rooms',
            'rooms.desc.rooms': 'Rooms have been added:',
            'rooms.li.create_room': 'Each player can create their own room with a name, password and player limit',
            'rooms.li.steam': 'Rooms are implemented via the Steam service',
            'rooms.heading.repaint': 'Car Repainting',
            'rooms.desc.repaint': 'Drive up to a workshop to repaint your car any color',
            'rooms.li.rgb': 'Repainting is done via an RGB color panel',
            'rooms.heading.added': 'Added',
            'rooms.desc.added': 'Also added:',
            'rooms.added.help': 'The /help command',
            'rooms.added.rs3': 'New vehicle: RS3',
            'rooms.added.ps': 'P.S. the site was moved to the domain aetheris-sandbox.ru',
            'rooms.gallery1': 'Room system',
            'rooms.gallery2': 'Car repainting system',
            'rooms.gallery1_img': 'Room system screenshot',
            'rooms.gallery2_img': 'Repaint system screenshot',
            'update.rooms_title': 'Rooms & Repaint',
            /* weapons-interiors page */
            'weapons.heading.system': 'New Weapon System',
            'weapons.desc.system': 'We added firing mechanics, weapons and more:',
            'weapons.li.fire_modes': 'Different fire modes',
            'weapons.li.hit_effects': 'Hit effects',
            'weapons.li.script': 'Functional script to add various weapons',
            'weapons.heading.interiors': 'Building Interiors',
            'weapons.li.enter_buildings': 'Added system allowing entry into certain buildings',
            'weapons.li.build_inside': 'You can build and interact with objects inside buildings',
            'weapons.li.save_changes': 'Implemented saving changes in interiors',
            'weapons.heading.misc': 'Other Improvements',
            'weapons.li.physics': 'Improved object physics',
            'weapons.li.hud': 'Updated health HUD',
            'weapons.li.model': 'Old character model has been changed',
            'weapons.li.optim': 'Performance optimizations',
            'weapons.gallery1': 'New weapon system in action',
            'weapons.gallery2': 'Example of a building interior'
            , 'weapons.gallery1_img': 'Weapon system screenshot',
            'weapons.gallery2_img': 'Interior screenshot',
            'update.weapons_title': 'Weapons & Interiors',
            /* major-update page */
            'update.major_title': 'Closed Beta Testing',
            'major.intro': 'The closed beta test has been successfully completed with five testers. Despite some issues found, the team is actively working on fixing them. All new content described below has been tested and refined.',
            'major.heading.weapons': 'New weapon: AK',
            'major.desc.weapons': 'Added new weapon with full mechanics implementation:',
            'major.li.recoil': 'Weapon recoil',
            'major.li.spread': 'Realistic bullet spread',
            'major.li.shells': 'Ejecting shell casings',
            'major.li.bullet_holes': 'Visible bullet holes in environment',
            'major.li.anim_inspect': 'Weapon inspection animation',
            'major.li.anim_reload': 'Reloading animation',
            'major.heading.vehicles': 'Vehicle Improvements',
            'major.li.physics': 'Completely reworked vehicle physics',
            'major.li.spawn': 'Spawn vehicles from spawn panel',
            'major.li.health': 'New vehicle HP system',
            'major.li.crush': 'Can now run over players with vehicles',
            'major.li.lights': 'Enhanced light system',
            'major.li.mud': 'Mud trails from wheels',
            'major.heading.world': 'Environment and Atmosphere',
            'major.li.skybox': 'New Nelik Studio intro',
            'major.li.day_time': 'Day/Night cycle (Morning-Day-Evening-Night)',
            'major.li.custom_skybox': 'New custom Skybox',
            'major.li.weather': 'Weather system (Clear-Cloudy-Rain-Fog)',
            'major.heading.graphics': 'Graphics',
            'major.li.ambient_occlusion': 'Ambient Occlusion (Completely reworked graphics)',
            'major.heading.audio': 'Audio',
            'major.li.footsteps': 'Character footstep sounds (depends on surface)',
            'major.li.surface_sounds': 'Footstep sounds depend on material layer',
            'major.heading.gameplay': 'Gameplay Mechanics',
            'major.li.physics_impulse': 'Objects get physical impulse from weapon hits',
            'major.li.build_system': 'Updated building system',
            'major.li.ragdoll': 'Character ragdoll on death',
            'major.gallery1': 'New AK weapon in action',
            'major.gallery2': 'Improved vehicle physics',
            'major.gallery3': 'Dynamic day/night cycle',
            'major.gallery1_img': 'Weapon screenshot',
            'major.gallery2_img': 'Vehicle screenshot',
            'major.gallery3_img': 'Time of day screenshot',
        }
    };

    function setElementText(el, text) {
        if (!el) return;
        // If element has a child with class i18n-text, set it (keeps icons intact)
        const inner = el.querySelector && el.querySelector('.i18n-text');
        if (inner) {
            inner.textContent = text;
            return;
        }

        // If element contains an <i> icon, try to replace the text node after it
        const icon = el.querySelector && el.querySelector('i');
        if (icon) {
            // find text nodes and replace the first non-empty one after icon
            let replaced = false;
            for (let node of el.childNodes) {
                if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                    node.textContent = ' ' + text;
                    replaced = true;
                    break;
                }
            }
            if (!replaced) {
                el.appendChild(document.createTextNode(' ' + text));
            }
            return;
        }

        // Default: replace textContent
        el.textContent = text;
    }

    function applyTranslations(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const attr = el.getAttribute('data-i18n-attr');
            const val = (translations[lang] && translations[lang][key]) || (translations.ru && translations.ru[key]) || '';

            if (attr) {
                try {
                    el.setAttribute(attr, val);
                } catch (e) {
                    // fallback to text content
                    setElementText(el, val);
                }
            } else {
                setElementText(el, val);
            }
        });
    }

    function setLanguage(lang) {
        if (!translations[lang]) lang = 'ru';
        localStorage.setItem('site_lang', lang);
        document.documentElement.lang = (lang === 'en') ? 'en' : 'ru';
        applyTranslations(lang);

        // Update active state of lang buttons
        document.querySelectorAll('.lang-btn').forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-lang') === lang);
        });
    }

    function setupLangSwitcher() {
        const switcher = document.querySelectorAll('.lang-btn');
        if (!switcher) return;
        switcher.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                setLanguage(lang);
            });
        });

        // init language: prefer saved selection, otherwise detect by locale/region
        function detectLangByRegion() {
            // CIS country codes and common locales where Russian should be default
            const cisCountries = new Set(['RU','BY','UA','KZ','KG','TJ','TM','AZ','AM','MD','UZ']);

            // navigator.languages gives preferred locales
            const langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || navigator.userLanguage || 'en'];

            for (let loc of langs) {
                if (!loc) continue;
                // examples: 'ru', 'ru-RU', 'en-US', 'uk-UA'
                const parts = loc.split(/[-_]/);
                const primary = (parts[0] || '').toLowerCase();
                const region = (parts[1] || '').toUpperCase();

                // if primary language is russian/ukrainian/belarusian -> prefer Russian UI
                if (primary === 'ru' || primary === 'uk' || primary === 'be') return 'ru';

                // region-based detection (e.g., en-RU won't normally appear, but handle region codes)
                if (region && cisCountries.has(region)) return 'ru';
            }

            // as a lightweight fallback, try timezone hints
            try {
                const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
                const tzLower = tz.toLowerCase();
                const tzHints = ['russia', 'moscow', 'kyiv', 'minsk', 'almaty', 'tashkent', 'baku', 'yerevan', 'tbilisi'];
                for (let h of tzHints) if (tzLower.includes(h)) return 'ru';
            } catch (e) {
                // ignore
            }

            // default to English
            return 'en';
        }

        const saved = localStorage.getItem('site_lang');
        const initial = saved || detectLangByRegion();
        setLanguage(initial);
    }

    // Mobile nav toggle: inject a toggle button and wire behavior
    function setupMobileNav() {
        const header = document.querySelector('header');
        const headerContainer = header && header.querySelector('.header-content');
        if (!header || !headerContainer) return;

        // create toggle only once
        if (!headerContainer.querySelector('.nav-toggle')) {
            const btn = document.createElement('button');
            btn.className = 'nav-toggle';
            btn.setAttribute('aria-label', 'Toggle navigation');
            btn.innerHTML = '<i class="fas fa-bars"></i>';
            headerContainer.appendChild(btn);

            btn.addEventListener('click', () => {
                header.classList.toggle('nav-open');
            });
        }
    }

    setupLangSwitcher();
    setupMobileNav();
});