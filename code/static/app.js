document.addEventListener('DOMContentLoaded', () => {
    
    // --- View Navigation ---
    const loginView = document.getElementById('login-view');
    const mainView = document.getElementById('main-view');
    const startSessionBtn = document.getElementById('start-session-btn');
    
    const apiKeyInput = document.getElementById('api-key-input');
    const modelSelect = document.getElementById('model-select');

    // Localization Dictionary
    const i18n = {
        zh: {
            "nav_reply": "即时高情商回复",

            "lbl_tone_nuance": "Tone Nuance / 语气微调",
                "tone_wit": "机智度 (Wit)",
                "tone_diplomacy": "委婉度 (Diplomacy)",
                "tone_directness": "直率度 (Directness)",
                "tone_empathy": "共情度 (Empathy)",
                "sb_h1": "⚡ 核心漏洞",
                "sb_h2": "💥 隐患危机（最坏结果）",
                "sb_h3": "🛡️ 优化方向",
                "sb_h4": "👑 大师级话术建议",
            "nav_sandbox": "深度沙盘演推",
            "nav_setting": "系统设置",
            "nav_support": "支持文档",
            "nav_theme_light": "白天模式",
            "nav_theme_dark": "夜间模式",
            "h_reply_title": "即时高情商回复",
            "h_reply_sub": "通过AI语义引擎精准分析对话语境，为您提供体面且极具张力的社交回应方案。",
            "h_sandbox_title": "深度沙盘演推",
            "h_sandbox_sub": "预判反应，测算结果，通过多层 AI 场景建模优化您的社交策略。",
            "h_setting_title": "设置 / Configurations",
            "h_setting_sub": "定制您的模型底座参数与对话习惯的偏好。",
            "h_support_title": "支持与文档 / Resources",
            "h_support_sub": "探索引擎的工作源理或查看实时的服务器连通情况。",
            "lbl_in_ctx": "INPUT CONTEXT | 上下文",
            "lbl_in_scenario": "DIALOGUE SCENARIO | 场景补充（选填）",
            "lbl_tone": "TONE PREFERENCE | 语气偏好",
            "pl_recv_msg": "在此粘贴您收到的消息...",
            "pl_scenario": "例如：这是公司群聊 / 她是我相亲对象",
            "btn_gen_reply": "✨ 生成高情商回复 | GENERATE",
            "lbl_sb_desc": "SCENARIO DESCRIPTION | 场景事件描述",
            "lbl_sb_my_role": "MY ROLE | 我的角色",
            "lbl_sb_target_role": "OPPONENT ROLE | 对方角色",
            "lbl_sb_my_plan": "MY INITIAL RESPONSE | 我的拟定应对方案",
            "pl_sb_desc": "描述发生的具体事件背景...",
            "pl_sb_my_role": "你在此场景下的身份",
            "pl_sb_target_role": "对方的性格与身份",
            "pl_sb_my_plan": "输入你最直观想说的话或方案...",
            "btn_start_sim": "🔮 启动大师沙盘推演 | START SIMULATION",
            "result_ai_analyze": "AI 分析与破局思路",
            "result_sb_analyze": "推演结果分析",
            "set_engine_cfg": "引擎配置 / Engine Configuration",
            "lbl_api_key": "API KEY | 访问密钥",
            "btn_show": "显示",
            "btn_hide": "隐藏",
            "lbl_model": "LANGUAGE MODEL | 模型选择",
            "set_prefs": "偏好设置 / Preferences",
            "lbl_ui_lang": "INTERFACE LANGUAGE | 界面语言",
            "desc_lang": "切换语言后界面将全局适配为所选语言 (The interface will globally adapt to the selected language).",
            "lbl_font_size": "GLOBAL FONT SIZE | 全局字体大小",
            "desc_font_size": "调节滑块动态放大或缩小界面中的文本字号 (Adjust the slider to scale global text size).",
            "btn_save_cfg": " 保存配置 | SAVE",
            "sup_kb": "使用指南 / Knowledge Base",
            "sup_q1": "如何写出更好的补充场景（Scenario）？",
            "sup_a1": "在“场景补充”中，尽量描述您和对方的权力关系（如：他是我上司/平级同事）、当前事件的影响程度，这能帮助算法推算出更符合身份语境的极佳回复。",
            "sup_q2": "沙盘推演的准确率如何保障？",
            "sup_a2": "沙盘推演基于多维度的大语言模型代理博弈技术，通过不同性格角色预演对抗。虽然不能100%预测所有人类神经反应行为，但能帮您规避极大部分隐性雷区。",
            "sup_sys_status": "系统状态 / System Status",
            "sup_engine": "当前引擎版本 (Engine Version)",
            "sup_conn": "服务器连接 (Server Connectivity)",
            "sup_op": "正常运行中 (Operational)",
            "loading_text": "CURATOR AI 运作中...",
            "login_title": "会话设置",
            "login_sub": "配置你的环境以开启高情商对话",
            "login_api_lbl": "API KEY",
            "login_api_pl": "请输入您的 API 密钥",
            "login_model_lbl": "SELECT LARGE MODEL",
            "login_btn": "进入策展引擎",
            "login_help": "需要帮助寻找密钥？ 查看文档",
            "login_footer": "© 2026 CURATOR AI. 始于克制，成于意图。"
        },
        en: {
            "nav_reply": "Instant EQ Reply",

            "lbl_tone_nuance": "Tone Nuance",
                "tone_wit": "Wit",
                "tone_diplomacy": "Diplomacy",
                "tone_directness": "Directness",
                "tone_empathy": "Empathy",
                "sb_h1": "⚡ Core Vulnerability",
                "sb_h2": "💥 Potential Crisis (Worst Outcome)",
                "sb_h3": "🛡️ Optimization Strategy",
                "sb_h4": "👑 Master-level Script Suggestion",
            "nav_sandbox": "Sandbox Simulation",
            "nav_setting": "SETTINGS",
            "nav_support": "SUPPORT",
            "nav_theme_light": "Light Mode",
            "nav_theme_dark": "Dark Mode",
            "h_reply_title": "Instant EQ Reply",
            "h_reply_sub": "Analyze dialog contexts via AI semantic engine to craft decent and compelling social responses.",
            "h_sandbox_title": "Deep Sandbox Simulation",
            "h_sandbox_sub": "Anticipate reactions & simulate outcomes. Optimize your social strategy via multilayer AI modeling.",
            "h_setting_title": "Settings / Configurations",
            "h_setting_sub": "Customize your underlying model parameters and dialogue preferences.",
            "h_support_title": "Support & Docs / Resources",
            "h_support_sub": "Explore the engine's mechanics or view real-time server connectivity.",
            "lbl_in_ctx": "INPUT CONTEXT",
            "lbl_in_scenario": "DIALOGUE SCENARIO (Optional)",
            "lbl_tone": "TONE PREFERENCE",
            "pl_recv_msg": "Paste the received message here...",
            "pl_scenario": "e.g., Company group chat / She is my blind date",
            "btn_gen_reply": "✨ GENERATE EQ REPLY",
            "lbl_sb_desc": "SCENARIO DESCRIPTION",
            "lbl_sb_my_role": "MY ROLE",
            "lbl_sb_target_role": "OPPONENT'S ROLE",
            "lbl_sb_my_plan": "MY INITIAL RESPONSE",
            "pl_sb_desc": "Describe the specific event background...",
            "pl_sb_my_role": "Your identity in this scenario",
            "pl_sb_target_role": "Opponent's personality & identity",
            "pl_sb_my_plan": "What you intuitively want to say...",
            "btn_start_sim": "🔮 START MASTER SIMULATION",
            "result_ai_analyze": "AI Analysis & Breakthrough Strategy",
            "result_sb_analyze": "Simulation Results & Analysis",
            "set_engine_cfg": "Engine Configuration",
            "lbl_api_key": "API KEY",
            "btn_show": "SHOW",
            "btn_hide": "HIDE",
            "lbl_model": "LANGUAGE MODEL",
            "set_prefs": "Preferences",
            "lbl_ui_lang": "INTERFACE LANGUAGE",
            "desc_lang": "The interface will globally adapt to the selected language.",
            "lbl_font_size": "GLOBAL FONT SIZE",
            "desc_font_size": "Adjust the slider to scale global text size.",
            "btn_save_cfg": " SAVE CONFIGURATION",
            "sup_kb": "Knowledge Base",
            "sup_q1": "How to write a better Dialogue Scenario?",
            "sup_a1": "Try to describe power dynamics (e.g. He is my boss/peer) and the impact of the event. This helps the algorithm calculate optimal responses.",
            "sup_q2": "How accurate is the Sandbox Simulation?",
            "sup_a2": "It is based on multi-dimensional LLM agent game theory. While not predicting human behavior 100%, it helps you avoid the vast majority of communication landmines.",
            "sup_sys_status": "System Status",
            "sup_engine": "Engine Version",
            "sup_conn": "Server Connectivity",
            "sup_op": "Operational",
            "loading_text": "CURATOR AI is Processing...",
            "login_title": "Session Setup",
            "login_sub": "Configure your environment to start EQ conversations",
            "login_api_lbl": "API KEY",
            "login_api_pl": "Enter your API Key...",
            "login_model_lbl": "SELECT LARGE MODEL",
            "login_btn": "ENTER CURATOR ENGINE",
            "login_help": "Need help finding your key? View Docs",
            "login_footer": "© 2026 CURATOR AI. Restraint meets intention."
        }
    };

    // Apply language dynamically
    function applyLanguage(lang) {
        const dict = i18n[lang] || i18n['en'];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    if (el.hasAttribute('placeholder') || key.startsWith('pl_') || key.endsWith('_pl')) {
                        el.placeholder = dict[key];
                    } else {
                        el.value = dict[key];
                    }
                } else if(el.hasChildNodes() && Array.from(el.childNodes).some(n => n.nodeType === 3 && n.nodeValue.trim().length > 0)) {
                    // Update only text nodes without trashing inner HTML (like spans)
                    Array.from(el.childNodes).forEach(node => {
                        if(node.nodeType === 3 && node.nodeValue.trim().length > 0) {
                            node.nodeValue = dict[key]; // Or just default to updating entire innerText if no icons inside
                        }
                    });
                     // specific manual overrides for structured elements:
                     if(key === 'btn_save_cfg') el.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px;">save</span> ${dict[key]}`;
                } else {
                    el.textContent = dict[key];
                }
            }
        });
        
        // Manual handling for specific cases with icons mixed in
        const btnSave = document.querySelector('[data-i18n="btn_save_cfg"]');
        if(btnSave) btnSave.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px;">save</span> ${dict['btn_save_cfg']}`;

        const q1 = document.querySelector('[data-i18n="sup_q1"]');
        if(q1) q1.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px;">tips_and_updates</span> ${dict['sup_q1']}`;
        
        const q2 = document.querySelector('[data-i18n="sup_q2"]');
        if(q2) q2.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px;">analytics</span> ${dict['sup_q2']}`;

        const op = document.querySelector('[data-i18n="sup_op"]');
        if(op) op.innerHTML = `<span style="width: 8px; height: 8px; border-radius: 50%; background: var(--accent-green); display: inline-block;"></span> ${dict['sup_op']}`;

        // Options logic for Tone (Hardcoded to rewrite correctly based on selection)
        const toneSelect = document.getElementById('reply-tone');
        if(toneSelect) {
            const val = toneSelect.value;
            toneSelect.innerHTML = lang === 'en' ? `
                <option value="专业严谨" ${val==='专业严谨'?'selected':''}>Preset: Professional & Formal</option>
                <option value="温和委婉" ${val==='温和委婉'?'selected':''}>Preset: Gentle & Tactful</option>
                <option value="真诚坦率" ${val==='真诚坦率'?'selected':''}>Preset: Sincere & Direct</option>
                <option value="机智幽默" ${val==='机智幽默'?'selected':''}>Preset: Witty & Humorous</option>
                <option value="不卑不亢" ${val==='不卑不亢'?'selected':''}>预设：不卑不亢</option>
                <option value="阴阳怪气" ${val==='阴阳怪气'?'selected':''} style="color:#ffb4ab;">火力全开：阴阳怪气</option>
                <option value="custom" ${val==='custom'?'selected':''}>自定义微调 / Custom</option>
            ` : `
                <option value="专业严谨" ${val==='专业严谨'?'selected':''}>预设：专业严谨</option>
                <option value="温和委婉" ${val==='温和委婉'?'selected':''}>预设：温和委婉</option>
                <option value="真诚坦率" ${val==='真诚坦率'?'selected':''}>预设：真诚坦率</option>
                <option value="机智幽默" ${val==='机智幽默'?'selected':''}>预设：机智幽默</option>
                <option value="不卑不亢" ${val==='不卑不亢'?'selected':''}>预设：不卑不亢</option>
                <option value="阴阳怪气" ${val==='阴阳怪气'?'selected':''} style="color:#ffb4ab;">火力全开：阴阳怪气</option>
                <option value="custom" ${val==='custom'?'selected':''}>自定义微调 / Custom</option>
            `;
        }
    }

    // Initialize UI language on load
    const currentLang = localStorage.getItem('curator_lang') || 'en';
    applyLanguage(currentLang);

    // Load saved API key
    const savedKey = localStorage.getItem('curator_api_key');
    if(savedKey) apiKeyInput.value = savedKey;

    startSessionBtn.addEventListener('click', () => {
        if(!apiKeyInput.value.trim()) {
            alert("请输入您的 API Key！");
            return;
        }
        localStorage.setItem('curator_api_key', apiKeyInput.value.trim());
        
        loginView.classList.remove('active');
        loginView.classList.add('hidden');
        mainView.classList.remove('hidden');
        mainView.classList.add('active');

        // Propagate current API key to Settings automatically
        const settingsApiKey = document.getElementById('settings-api-key');
        if (settingsApiKey) {
            settingsApiKey.value = apiKeyInput.value.trim();
        }
        const settingsModel = document.getElementById('settings-model');
        if (settingsModel) {
            settingsModel.value = modelSelect.value;
        }
    });

    // --- Tab Switching ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const headerTitle = document.getElementById('header-title');
    const headerSubtitle = document.getElementById('header-subtitle');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update Active Tab Button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update Tab Content
            const target = btn.getAttribute('data-target');
            tabContents.forEach(content => {
                if(content.id === target) {
                    content.classList.remove('hidden');
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                    content.classList.add('hidden');
                }
            });

            // Update Title dynamically based on NING's design
            const dict = i18n[localStorage.getItem('curator_lang') || 'en'] || i18n['zh'];
            if(target === 'instant-reply') {
                headerTitle.textContent = dict['h_reply_title'];
                headerSubtitle.textContent = dict['h_reply_sub'];
            } else if(target === 'sandbox') {
                headerTitle.textContent = dict['h_sandbox_title'];
                headerSubtitle.textContent = dict['h_sandbox_sub'];
            } else if (target === 'settings') {
                headerTitle.textContent = dict['h_setting_title'];
                headerSubtitle.textContent = dict['h_setting_sub'];
                
                // Initialize settings fields with current values
                document.getElementById('settings-api-key').value = apiKeyInput.value.trim();
                document.getElementById('settings-model').value = modelSelect.value;
                document.getElementById('settings-lang').value = localStorage.getItem('curator_lang') || 'en';
            } else if (target === 'support') {
                headerTitle.textContent = dict['h_support_title'];
                headerSubtitle.textContent = dict['h_support_sub'];
            }
        });
    });

    // --- Settings Interactivity ---
    const toggleKeyVisibilityBtn = document.getElementById('toggle-key-visibility');
    const setApiKeyInput = document.getElementById('settings-api-key');
    const saveSettingsBtn = document.getElementById('save-settings-btn');
    const setModelInput = document.getElementById('settings-model');
    const setLangInput = document.getElementById('settings-lang');

    // Font Size Logic
    const setFontSizeInput = document.getElementById('settings-font-size');
    const fontSizeVal = document.getElementById('font-size-val');

    function applyFontSize(size) {
        let styleEl = document.getElementById('dynamic-font-size-style');
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'dynamic-font-size-style';
            document.head.appendChild(styleEl);
        }
        styleEl.innerHTML = `
            html, body, p, span:not(.material-symbols-outlined), div, input, textarea, select, button, label { font-size: ${size}px !important; }
            h1 { font-size: ${parseInt(size) * 1.8}px !important; }
            h2 { font-size: ${parseInt(size) * 1.5}px !important; }
            h3 { font-size: ${parseInt(size) * 1.17}px !important; }
        `;
    }

    const savedFontSize = localStorage.getItem('curator_font_size') || '16';
    if(setFontSizeInput && fontSizeVal) {
        setFontSizeInput.value = savedFontSize;
        fontSizeVal.textContent = savedFontSize + 'px';
        applyFontSize(savedFontSize);
        
        setFontSizeInput.addEventListener('input', (e) => {
            const size = e.target.value;
            fontSizeVal.textContent = size + 'px';
            applyFontSize(size);
            localStorage.setItem('curator_font_size', size);
        });
    } else {
        // Apply even if not on settings page (on load)
        applyFontSize(savedFontSize);
    }

    if (toggleKeyVisibilityBtn && setApiKeyInput) {
        toggleKeyVisibilityBtn.addEventListener('click', () => {
            if (setApiKeyInput.type === 'password') {
                setApiKeyInput.type = 'text';
                toggleKeyVisibilityBtn.textContent = '隐藏';
            } else {
                setApiKeyInput.type = 'password';
                toggleKeyVisibilityBtn.textContent = '显示';
            }
        });
    }

    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', () => {
            const newKey = setApiKeyInput.value.trim();
            const newModel = setModelInput.value;
            const newLang = setLangInput.value;

            // Sync to Global UI state
            apiKeyInput.value = newKey;
            localStorage.setItem('curator_api_key', newKey);
            
            modelSelect.value = newModel;
            localStorage.setItem('curator_model', newModel);

            localStorage.setItem('curator_lang', newLang);
            applyLanguage(newLang); // Update UI text

            // Also explicitly update the app-header titles based on CURRENT active tab
            const dict = i18n[newLang] || i18n['zh'];
            const activeTab = document.querySelector('.tab-btn.active');
            if (activeTab) {
                const target = activeTab.getAttribute('data-target');
                if(target === 'instant-reply') {
                    document.getElementById('header-title').textContent = dict['h_reply_title'];
                    document.getElementById('header-subtitle').textContent = dict['h_reply_sub'];
                } else if(target === 'sandbox') {
                    document.getElementById('header-title').textContent = dict['h_sandbox_title'];
                    document.getElementById('header-subtitle').textContent = dict['h_sandbox_sub'];
                } else if (target === 'settings') {
                    document.getElementById('header-title').textContent = dict['h_setting_title'];
                    document.getElementById('header-subtitle').textContent = dict['h_setting_sub'];
                } else if (target === 'support') {
                    document.getElementById('header-title').textContent = dict['h_support_title'];
                    document.getElementById('header-subtitle').textContent = dict['h_support_sub'];
                }
            }

            // Optional visual feedback
            const originalText = saveSettingsBtn.innerHTML;
            saveSettingsBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px;">check</span> ${newLang === 'en' ? 'SAVED' : '已保存 | SAVED'}`;
            saveSettingsBtn.style.color = '#003824';
            saveSettingsBtn.style.background = 'var(--accent-green)';
            
            setTimeout(() => {
                saveSettingsBtn.innerHTML = originalText;
                saveSettingsBtn.style.color = '';
                saveSettingsBtn.style.background = '';
            }, 2000);
        });
    }

    // --- API Setup ---
    const BACKEND_URL = ""; // Relative path to FastAPI backend since it's mounted
    const loadingOverlay = document.getElementById('loading-overlay');

    function showLoading() { loadingOverlay.classList.remove('hidden'); }
    function hideLoading() { loadingOverlay.classList.add('hidden'); }

    // --- Tone Nuance Sliders Integration ---
    const toneSelectElement = document.getElementById('reply-tone');
    const nuanceSliders = {
        wit: document.getElementById('tone-wit'),
        diplomacy: document.getElementById('tone-diplomacy'),
        directness: document.getElementById('tone-directness'),
        empathy: document.getElementById('tone-empathy')
    };
    const nuanceDisplays = {
        wit: document.getElementById('val-wit'),
        diplomacy: document.getElementById('val-diplomacy'),
        directness: document.getElementById('val-directness'),
        empathy: document.getElementById('val-empathy')
    };

    function updateNuanceDisplays() {
        Object.keys(nuanceSliders).forEach(key => {
            if (nuanceSliders[key]) {
                nuanceDisplays[key].innerText = nuanceSliders[key].value + '%';
            }
        });
    }

    // Trigger custom option when a user manually drags a slider
    Object.keys(nuanceSliders).forEach(key => {
        if (nuanceSliders[key]) {
            nuanceSliders[key].addEventListener('input', () => {
                updateNuanceDisplays();
                if (toneSelectElement) {
                    toneSelectElement.value = 'custom';
                    
                    // Optionally un-disable 'custom' if disabled
                    const customOpt = toneSelectElement.querySelector('option[value="custom"]');
                    if (customOpt) customOpt.disabled = false;
                }
            });
        }
    });

    // Apply presets when a dropdown item is picked
    if (toneSelectElement) {
        toneSelectElement.addEventListener('change', () => {
            const val = toneSelectElement.value;
            const presets = {
                '专业严谨': { wit: 10, diplomacy: 90, directness: 80, empathy: 40 },
                '温和委婉': { wit: 15, diplomacy: 100, directness: 10, empathy: 95 },
                '真诚坦率': { wit: 30, diplomacy: 40, directness: 100, empathy: 60 },
                '机智幽默': { wit: 100, diplomacy: 60, directness: 40, empathy: 50 },
                '不卑不亢': { wit: 40, diplomacy: 70, directness: 85, empathy: 30 },
                '阴阳怪气': { wit: 100, diplomacy: 0, directness: 90, empathy: 0 }
            };
            if (presets[val]) {
                nuanceSliders.wit.value = presets[val].wit;
                nuanceSliders.diplomacy.value = presets[val].diplomacy;
                nuanceSliders.directness.value = presets[val].directness;
                nuanceSliders.empathy.value = presets[val].empathy;
                updateNuanceDisplays();
            }
        });
        
        // Initialize default preset sliders
        toneSelectElement.value = '专业严谨';
        toneSelectElement.dispatchEvent(new Event('change'));
    }

    // --- Feature 1: Instant Reply ---
    document.getElementById('generate-reply-btn').addEventListener('click', async () => {
        const message = document.getElementById('reply-message').value.trim();
        if(!message) { alert("请填入对方发来的消息！"); return; }
        
        const context = document.getElementById('reply-context').value.trim();
        let tone = document.getElementById('reply-tone').value;
        const currentLang = localStorage.getItem('curator_lang') || 'en';
        
        // Translate tone for LLM if in English mode
        if (currentLang === 'en') {
            const enToneMap = {
                '专业严谨': 'Professional & Formal',
                '温和委婉': 'Gentle & Tactful',
                '真诚坦率': 'Sincere & Direct',
                '机智幽默': 'Witty & Humorous',
                '不卑不亢': 'Neither humble nor overbearing',
                '阴阳怪气': 'Sarcastic & Aggressive'
            };
            if (tone === 'custom') {
                tone = `Custom fine-tuned tone => Wit:${nuanceSliders.wit.value}%, Diplomacy:${nuanceSliders.diplomacy.value}%, Directness:${nuanceSliders.directness.value}%, Empathy:${nuanceSliders.empathy.value}%`;
            } else if (enToneMap[tone]) {
                tone = enToneMap[tone];
            }
        } else {
            if (tone === 'custom') {
                tone = `自定义微调语气 => 机智度:${nuanceSliders.wit.value}%, 外交委婉度:${nuanceSliders.diplomacy.value}%, 直率度:${nuanceSliders.directness.value}%, 共情度:${nuanceSliders.empathy.value}%`;
            }
        }

        showLoading();
        try {
            const res = await fetch(`${BACKEND_URL}/api/instant-reply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message, context, tone,
                    model: modelSelect.value,
                    api_key: apiKeyInput.value.trim()
                })
            });
            const result = await res.json();
            hideLoading();

            if(res.ok && result.data) {
                document.getElementById('instant-reply').classList.add('has-results');
                document.getElementById('reply-results').classList.remove('hidden');
                document.getElementById('reply-explanation').innerText = result.data.explanation || "";
                document.getElementById('reply-opt-1').innerText = result.data.reply_1 || "";
                document.getElementById('reply-opt-2').innerText = result.data.reply_2 || "";
                document.getElementById('reply-opt-3').innerText = result.data.reply_3 || "";
                
                // Add to History
                const rawTone = document.getElementById('reply-tone').value;
                const titleText = context ? `${context} - 回复生成` : (message.length > 10 ? message.substring(0,10)+'...' : message);
                addHistoryItem(titleText, rawTone, result.data);

            } else {
                alert(`后盾报错: ${result.detail || JSON.stringify(result)}`);
            }
        } catch(e) {
            hideLoading();
            alert("请求失败，请确保后端服务正常运行：" + e);
        }
    });

    // --- History Logic ---
    function formatTime(dateObj) {
        if (!dateObj) return '';
        const now = new Date();
        const diffMs = now - dateObj;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHrs = Math.floor(diffMins / 60);
        if (diffMins < 60) return `${diffMins || 1}分钟前`;
        if (diffHrs < 24) return `${diffHrs}小时前`;
        return `${dateObj.getMonth()+1}月${dateObj.getDate()}日`;
    }

    function addHistoryItem(title, tone, responseData) {
        let history = JSON.parse(localStorage.getItem('curator_history') || '[]');
        history.unshift({
            timestamp: Date.now(),
            title: title,
            tone: tone,
            data: responseData
        });
        if(history.length > 10) history = history.slice(0, 10);
        localStorage.setItem('curator_history', JSON.stringify(history));
        renderHistory();
    }

    function renderHistory() {
        const historyContainer = document.getElementById('recent-reflections-container');
        const scrollArea = document.getElementById('history-scroll-area');
        if (!historyContainer || !scrollArea) return;

        let history = JSON.parse(localStorage.getItem('curator_history') || '[]');
        if (history.length === 0) {
            historyContainer.style.display = 'none';
            return;
        }

        historyContainer.style.display = 'block';
        scrollArea.innerHTML = '';
        
        history.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'history-card';
            card.innerHTML = `
                <div class="history-title">${item.title}</div>
                <div class="history-time">${formatTime(new Date(item.timestamp))}</div>
            `;
            
            // Re-load History on click
            card.addEventListener('click', () => {
                document.getElementById('instant-reply').classList.add('has-results');
                document.getElementById('reply-results').classList.remove('hidden');
                document.getElementById('reply-explanation').innerText = item.data.explanation || "";
                document.getElementById('reply-opt-1').innerText = item.data.reply_1 || "";
                document.getElementById('reply-opt-2').innerText = item.data.reply_2 || "";
                document.getElementById('reply-opt-3').innerText = item.data.reply_3 || "";
                
                // Highlight active card
                document.querySelectorAll('.history-card').forEach(c => c.style.borderColor = "var(--border-color)");
                card.style.borderColor = "var(--accent-green)";
            });

            scrollArea.appendChild(card);
        });
    }
    
    // Initial Render of history
    renderHistory();

    // --- Feature 2: Sandbox Simulation ---
    document.getElementById('run-sandbox-btn').addEventListener('click', async () => {
        const scenario = document.getElementById('sb-scenario').value.trim();
        const my_role = document.getElementById('sb-my-role').value.trim();
        const target_role = document.getElementById('sb-target-role').value.trim();
        const my_plan = document.getElementById('sb-my-plan').value.trim();

        if(!scenario || !my_role || !target_role || !my_plan) {
            alert("请确保所有场景参数都已填写！");
            return;
        }

        showLoading();
        try {
            const res = await fetch(`${BACKEND_URL}/api/sandbox-simulation`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    scenario, my_role, target_role, my_plan,
                    model: modelSelect.value,
                    api_key: apiKeyInput.value.trim()
                })
            });
            const result = await res.json();
            hideLoading();

            if(res.ok && result.data) {
                document.getElementById('sandbox').classList.add('has-results');
                const rd = result.data;
                const resultsArea = document.getElementById('sandbox-results');
                resultsArea.classList.remove('hidden');
                
                // Formatted display
                                // get correct language terms for sandbox headers
                const currentLang = localStorage.getItem('curator_lang') || 'en';
                const sbd = i18n[currentLang] || i18n['zh'];
                const naStr = currentLang === 'en' ? "N/A" : "无";
                const displayOutcome = rd.step_4_outcome ? rd.step_4_outcome.category + " - " + rd.step_4_outcome.brief_reason : naStr;
                const displayMasterScript = rd.step_6_better_scripts ? (rd.step_6_better_scripts.professional_firm || rd.step_6_better_scripts.witty_defuse || rd.step_6_better_scripts.empathetic_guidance) : naStr;

                document.getElementById('sandbox-content').innerHTML = `
                    <div style="margin-bottom: 16px;">
                        <h4 style="color: var(--accent-green); margin-bottom: 4px;">${sbd['sb_h1']}</h4>
                        <p style="color: var(--text-sec);">${rd.step_1_hidden_subtext || naStr}</p>
                    </div>
                    <div style="margin-bottom: 16px;">
                        <h4 style="color: #ff6b6b; margin-bottom: 4px;">${sbd['sb_h2']}</h4>
                        <p style="color: var(--text-sec);">${displayOutcome}</p>
                    </div>
                    <div style="margin-bottom: 16px;">
                        <h4 style="color: #4dabf7; margin-bottom: 4px;">${sbd['sb_h3']}</h4>
                        <p style="color: var(--text-sec);">${rd.step_5_eq_strategy || naStr}</p>
                    </div>
                    <div style="margin-bottom: 16px; background: var(--bg-main); padding: 16px; border-radius: 8px; border: 1px solid var(--border-color);">
                        <h4 style="color: var(--text-primary); margin-bottom: 8px;">${sbd['sb_h4']}</h4>
                        <p style="color: var(--text-sec); font-style: italic;">"${displayMasterScript}"</p>
                    </div>
                `;
            } else {
                alert(`后端报错: ${result.detail || JSON.stringify(result)}`);
            }
        } catch(e) {
            hideLoading();
            alert("请求失败，请确保后端服务正常运行：" + e);
        }
    });

    // --- Feature 3: Theme Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const themeLabel = document.getElementById('theme-label');
    
    function updateThemeText(isLight) {
        const currentLang = localStorage.getItem('curator_lang') || 'en';
        const dict = i18n[currentLang] || i18n['zh'];
        if (isLight) {
            themeIcon.innerText = 'dark_mode';
            themeLabel.innerText = dict['nav_theme_dark'] || '夜间模式';
        } else {
            themeIcon.innerText = 'light_mode';
            themeLabel.innerText = dict['nav_theme_light'] || '白天模式';
        }
    }
    
    if (themeToggleBtn) {
        // Check local storage for theme
        const currentTheme = localStorage.getItem('curator_theme');
        const isLightStart = currentTheme === 'light';
        if (isLightStart) {
            document.body.classList.add('light-mode');
        }
        updateThemeText(isLightStart);
        
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            localStorage.setItem('curator_theme', isLight ? 'light' : 'dark');
            updateThemeText(isLight);
        });
    }

    // Subscribe to language changes so theme toggle text updates
    document.getElementById('settings-lang').addEventListener('change', (e) => {
        setTimeout(() => {
            if (themeToggleBtn) {
                const isLight = document.body.classList.contains('light-mode');
                updateThemeText(isLight);
            }
        }, 50); // slight delay to allow normal i18n change
    });

});