(function () {
    'use strict';
    if (window.__shangshang_LOADED__) return;
    window.__shangshang_LOADED__ = true;
    var API_KEY = 'sk-016e82b669ad4dda85d52f5b964513f9';
    var API_URL = 'https://api.deepseek.com/chat/completions';
    var MODEL = 'deepseek-chat';
    var AVATAR_SRC = '熵熵.jpg';
    var AVATAR_SIZE = 74; // 与 CSS 中 .ss-avatar 尺寸一致
    var SYSTEM_PROMPT =
    '你是「熵熵」，生活在「熵增原理小游戏」里的可爱智能体精灵，圆滚滚、热情又机灵。' +
        '你喜欢用亲切可爱的语气和少量表情符号（如 😊✨🔥❄️）说话。' +
        '你擅长把热力学、熵增原理、冷热水混合、化学反应熵变等物理化学知识讲得简单有趣、通俗易懂。' +
        '请始终使用简体中文回答，语气可爱但不啰嗦，内容严谨、条理清晰。' +
        '回答请使用纯文本，不要使用 Markdown 格式，尤其不要出现 *、**、# 等符号。' +
        '如果被问到与物理化学无关的问题，也要友好地尽力解答。';
    var conversation = [{ role: 'system', content: SYSTEM_PROMPT }];
    var css = [
        '.ss-root{position:fixed;left:20px;top:20px;z-index:2147483000;font-family:"SimSun","宋体","Microsoft YaHei",sans-serif;-webkit-tap-highlight-color:transparent;text-align:left;line-height:1.4;}',
        '.ss-root *{box-sizing:border-box;margin:0;padding:0;}',
        '.ss-avatar{position:relative;display:block;width:74px;height:74px;padding:0;border:3px solid #fff;border-radius:50%;background:#fff;box-shadow:0 5px 0 #111,0 10px 26px rgba(0,0,0,.4);cursor:grab;overflow:visible;transition:transform .16s ease,box-shadow .16s ease;touch-action:none;}',
        '.ss-avatar:hover{transform:scale(1.06);}',
        '.ss-avatar.ss-dragging{cursor:grabbing;transform:scale(1.08);box-shadow:0 3px 0 #111,0 14px 32px rgba(0,0,0,.45);}',
        '.ss-avatar img{width:100%;height:100%;border-radius:50%;object-fit:cover;display:block;-webkit-user-drag:none;user-select:none;pointer-events:none;}',
        '.ss-badge{position:absolute;right:-2px;bottom:-2px;min-width:26px;height:26px;padding:0 5px;border-radius:14px;background:#ff4757;color:#fff;font-size:12px;font-weight:900;line-height:26px;text-align:center;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3);pointer-events:none;}',
        '.ss-hint{position:absolute;left:50%;bottom:88px;transform:translateX(-50%);white-space:nowrap;background:#fff;border:2px solid #111;border-radius:12px;padding:7px 12px;font-size:13px;font-weight:700;color:#111;box-shadow:3px 3px 0 rgba(0,0,0,.9);animation:ssHint 3.4s ease forwards;pointer-events:none;}',
        '@keyframes ssHint{0%{opacity:0;}12%{opacity:1;}82%{opacity:1;}100%{opacity:0;}}',
        '.ss-bubble{position:absolute;width:350px;max-width:calc(100vw - 32px);display:none;flex-direction:column;background:#fffdf4;border:3px solid #111;border-radius:18px;box-shadow:0 6px 0 rgba(0,0,0,.85),0 16px 38px rgba(0,0,0,.3);overflow:visible;animation:ssPop .18s ease;}',
        '@keyframes ssPop{from{opacity:0;transform:translateY(10px) scale(.96);}to{opacity:1;transform:translateY(0) scale(1);}}',
        '.ss-bubble.pos-above::before{content:"";position:absolute;bottom:-17px;left:var(--tail-x,30px);border-left:14px solid transparent;border-right:14px solid transparent;border-top:17px solid #111;}',
        '.ss-bubble.pos-above::after{content:"";position:absolute;bottom:-12px;left:calc(var(--tail-x,30px) + 4px);border-left:10px solid transparent;border-right:10px solid transparent;border-top:12px solid #fffdf4;}',
        '.ss-bubble.pos-below::before{content:"";position:absolute;top:-17px;left:var(--tail-x,30px);border-left:14px solid transparent;border-right:14px solid transparent;border-bottom:17px solid #111;}',
        '.ss-bubble.pos-below::after{content:"";position:absolute;top:-12px;left:calc(var(--tail-x,30px) + 4px);border-left:10px solid transparent;border-right:10px solid transparent;border-bottom:12px solid #fffdf4;}',
        '.ss-head{display:flex;align-items:center;gap:10px;padding:12px 14px;border-bottom:3px solid #111;background:linear-gradient(135deg,#ffe259,#ffa751);border-radius:14px 14px 0 0;}',
        '.ss-head-avatar{width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid #fff;background:#fff;}',
        '.ss-head-text{flex:1;min-width:0;}',
        '.ss-name{font-size:16px;font-weight:900;color:#111;line-height:1.1;}',
        '.ss-status{font-size:11px;font-weight:700;color:rgba(0,0,0,.6);}',
        '.ss-close{width:30px;height:30px;border:2px solid #111;border-radius:50%;background:#fff;font-size:15px;font-weight:900;color:#111;cursor:pointer;line-height:1;box-shadow:2px 2px 0 rgba(0,0,0,.8);transition:transform .12s;}',
        '.ss-close:hover{transform:scale(1.08);}',
        '.ss-close:active{transform:scale(.9);}',
        '.ss-min{width:30px;height:30px;border:2px solid #111;border-radius:50%;background:#fff;cursor:pointer;box-shadow:2px 2px 0 rgba(0,0,0,.8);transition:transform .12s;display:flex;align-items:center;justify-content:center;}',
        '.ss-min:hover{transform:scale(1.08);}',
        '.ss-min:active{transform:scale(.9);}',
        '.ss-minbar{display:block;width:11px;height:2.5px;background:#111;border-radius:1px;}',
        '.ss-chat{height:280px;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;background-image:radial-gradient(rgba(0,0,0,.05) 1px,transparent 1px);background-size:12px 12px;scrollbar-width:thin;}',
        '.ss-chat::-webkit-scrollbar{width:6px;}',
        '.ss-chat::-webkit-scrollbar-thumb{background:#d8d8d8;border-radius:3px;}',
        '.ss-msg{max-width:82%;padding:9px 12px;border-radius:14px;font-size:14px;line-height:1.55;white-space:pre-wrap;word-break:break-word;border:2px solid #111;box-shadow:2px 2px 0 rgba(0,0,0,.75);}',
        '.ss-msg-user{align-self:flex-end;background:#c7f0ff;border-radius:14px 14px 4px 14px;color:#111;}',
        '.ss-msg-bot{align-self:flex-start;background:#fff;border-radius:14px 14px 14px 4px;color:#111;display:flex;gap:8px;align-items:flex-start;}',
        '.ss-msg-bot img{width:26px;height:26px;border-radius:50%;object-fit:cover;border:2px solid #111;flex-shrink:0;margin-top:1px;}',
        '.ss-msg-bot .ss-body{min-width:0;}',
        '.ss-typing{display:inline-flex;gap:4px;align-items:center;height:18px;}',
        '.ss-typing span{width:7px;height:7px;border-radius:50%;background:#111;animation:ssBlink 1s infinite;}',
        '.ss-typing span:nth-child(2){animation-delay:.2s;}',
        '.ss-typing span:nth-child(3){animation-delay:.4s;}',
        '@keyframes ssBlink{0%,80%,100%{opacity:.25;transform:translateY(0);}40%{opacity:1;transform:translateY(-3px);}}',
        '.ss-input-row{display:flex;gap:8px;padding:10px;border-top:3px solid #111;background:#fff;border-radius:0 0 14px 14px;}',
        '.ss-input{flex:1;resize:none;border:2px solid #111;border-radius:10px;padding:9px 11px;font-size:14px;font-family:inherit;color:#111;background:#fff;outline:none;max-height:90px;line-height:1.4;}',
        '.ss-input:focus{border-color:#ff7a3d;box-shadow:0 0 0 3px rgba(255,122,61,.25);}',
        '.ss-send{border:2px solid #111;border-radius:10px;background:#2c7fb8;color:#fff;font-size:15px;font-weight:900;padding:0 16px;cursor:pointer;font-family:inherit;box-shadow:2px 2px 0 rgba(0,0,0,.8);transition:transform .12s,background .12s;}',
        '.ss-send:hover{background:#1f6a9e;}',
        '.ss-send:active{transform:scale(.94);}',
        '.ss-send:disabled{opacity:.55;cursor:not-allowed;}'
    ].join('\n');
    var styleEl = document.createElement('style');
    styleEl.id = 'shangshang-style';
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
    var root = document.createElement('div');
    root.className = 'ss-root';
    root.innerHTML =
        '<button class="ss-avatar" id="ssAvatar" type="button" title="点击召唤熵熵">' +
        '<img src="' + AVATAR_SRC + '" alt="熵熵" />' +
        '<span class="ss-badge">💬</span>' +
        '</button>' +
        '<div class="ss-bubble pos-above" id="ssBubble">' +
        '<div class="ss-head">' +
        '<img class="ss-head-avatar" src="' + AVATAR_SRC + '" alt="熵熵" />' +
        '<div class="ss-head-text"><div class="ss-name">熵熵</div><div class="ss-status">在线小助手</div></div>' +
        '<button class="ss-min" id="ssMin" type="button" title="最小化"><span class="ss-minbar"></span></button>' +
        '<button class="ss-close" id="ssClose" type="button" title="关闭">✕</button>' +
        '</div>' +
        '<div class="ss-chat" id="ssChat"></div>' +
        '<div class="ss-input-row">' +
        '<textarea class="ss-input" id="ssInput" rows="1" placeholder="向熵熵提问…"></textarea>' +
        '<button class="ss-send" id="ssSend" type="button">确定</button>' +
        '</div>' +
        '</div>';
    document.body.appendChild(root);
    var avatar = document.getElementById('ssAvatar');
    var bubble = document.getElementById('ssBubble');
    var closeBtn = document.getElementById('ssClose');
    var minBtn = document.getElementById('ssMin');
    var chat = document.getElementById('ssChat');
    var input = document.getElementById('ssInput');
    var sendBtn = document.getElementById('ssSend');
    var loading = false;
    var welcomed = false;
    var sessionId = 0;
    function scrollToBottom() {
        chat.scrollTop = chat.scrollHeight;
    }
    function autoResize() {
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 90) + 'px';
    }
    function addMessage(role, text) {
        var msg = document.createElement('div');
        msg.className = 'ss-msg ' + (role === 'user' ? 'ss-msg-user' : 'ss-msg-bot');
        if (role === 'bot') {
            var img = document.createElement('img');
            img.src = AVATAR_SRC;
            img.alt = '熵熵';
            var body = document.createElement('div');
            body.className = 'ss-body';
            body.textContent = text;
            msg.appendChild(img);
            msg.appendChild(body);
        } else {
            msg.textContent = text;
        }
        chat.appendChild(msg);
        scrollToBottom();
        return msg;
    }
    function showTyping() {
        var msg = document.createElement('div');
        msg.className = 'ss-msg ss-msg-bot';
        msg.id = 'ssTyping';
        var img = document.createElement('img');
        img.src = AVATAR_SRC;
        img.alt = '熵熵';
        var body = document.createElement('div');
        body.className = 'ss-body';
        body.innerHTML = '<span class="ss-typing"><span></span><span></span><span></span></span>';
        msg.appendChild(img);
        msg.appendChild(body);
        chat.appendChild(msg);
        scrollToBottom();
    }
    function hideTyping() {
        var t = document.getElementById('ssTyping');
        if (t) t.parentNode.removeChild(t);
    }
    function welcome() {
        if (welcomed) return;
        welcomed = true;
        addMessage('bot', '你好呀！我是「熵熵」😊\n有关熵、冷热水混合、熵增原理的问题，尽管问我～');
    }
    function positionBubble() {
        if (bubble.style.display !== 'flex') return;
        var rx = root.offsetLeft;
        var ry = root.offsetTop;
        var bw = bubble.offsetWidth;
        var bh = bubble.offsetHeight;
        var vw = window.innerWidth;
        var vh = window.innerHeight;
        var ax = rx + AVATAR_SIZE / 2;
        var GAP = 14;
        var placeAbove = true;
        var spaceAbove = ry - GAP;
        var spaceBelow = vh - (ry + AVATAR_SIZE) - GAP;
        if (spaceAbove < bh && spaceBelow > spaceAbove) placeAbove = false;
        var left = ax - bw / 2;
        left = Math.max(8, Math.min(left, vw - bw - 8));
        bubble.style.left = (left - rx) + 'px';
        bubble.style.right = 'auto';
        if (placeAbove) {
            bubble.style.top = 'auto';
            bubble.style.bottom = (AVATAR_SIZE + GAP) + 'px';
            bubble.classList.add('pos-above');
            bubble.classList.remove('pos-below');
        } else {
            bubble.style.top = (AVATAR_SIZE + GAP) + 'px';
            bubble.style.bottom = 'auto';
            bubble.classList.add('pos-below');
            bubble.classList.remove('pos-above');
        }
        var tailX = (ax - left) - 14;
        tailX = Math.max(12, Math.min(tailX, bw - 40));
        bubble.style.setProperty('--tail-x', tailX + 'px');
    }
    function clampRoot() {
        var x = root.offsetLeft;
        var y = root.offsetTop;
        x = Math.max(0, Math.min(x, window.innerWidth - AVATAR_SIZE));
        y = Math.max(0, Math.min(y, window.innerHeight - AVATAR_SIZE));
        root.style.left = x + 'px';
        root.style.top = y + 'px';
    }
    function open() {
        bubble.style.display = 'flex';
        welcome();
        positionBubble();
        input.focus();
    }
    function minimize() {
        bubble.style.display = 'none';
    }
    function close() {
        bubble.style.display = 'none';
        resetConversation();
    }
    function resetConversation() {
        sessionId++;
        conversation.length = 0;
        conversation.push({ role: 'system', content: SYSTEM_PROMPT });
        chat.innerHTML = '';
        welcomed = false;
    }
    closeBtn.addEventListener('click', function (e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        close();
    });
    minBtn.addEventListener('click', function (e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        minimize();
    });
    bubble.addEventListener('click', function (e) {
        if (e) e.stopPropagation();
    });
    var isDragging = false;
    var moved = false;
    var startX = 0,
        startY = 0;
    var startLeft = 0,
        startTop = 0;
    function onPointerDown(e) {
        if (e.button !== undefined && e.button !== 0) return;
        isDragging = true;
        moved = false;
        startX = e.clientX;
        startY = e.clientY;
        startLeft = root.offsetLeft;
        startTop = root.offsetTop;
        avatar.classList.add('ss-dragging');
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        window.addEventListener('pointermove', onPointerMove, { passive: false });
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);
    }
    function onPointerMove(e) {
        if (!isDragging) return;
        var dx = e.clientX - startX;
        var dy = e.clientY - startY;
        if (!moved && Math.abs(dx) < 4 && Math.abs(dy) < 4) return;
        moved = true;
        var nx = Math.max(0, Math.min(startLeft + dx, window.innerWidth - AVATAR_SIZE));
        var ny = Math.max(0, Math.min(startTop + dy, window.innerHeight - AVATAR_SIZE));
        root.style.left = nx + 'px';
        root.style.top = ny + 'px';
        if (bubble.style.display === 'flex') positionBubble();
        if (e) e.preventDefault();
    }
    function onPointerUp() {
        if (!isDragging) return;
        isDragging = false;
        avatar.classList.remove('ss-dragging');
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('pointercancel', onPointerUp);
        if (!moved) {
            if (bubble.style.display === 'none') open();
            else minimize();
        }
    }
    avatar.addEventListener('pointerdown', onPointerDown);

    // 吞掉头像上产生的 click 事件：对话框开关已在 pointerup 中处理，
    // 这里只负责阻断，避免 click 冒泡到页面触发全局监听器或跳转。
    avatar.addEventListener('click', function (e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
    });

    window.addEventListener('resize', function () {
        clampRoot();
        if (bubble.style.display === 'flex') positionBubble();
    });
    function send() {
        var text = input.value.replace(/\s+$/g, '');
        if (!text || loading) return;
        var mySession = sessionId;
        addMessage('user', text);
        input.value = '';
        autoResize();
        conversation.push({ role: 'user', content: text });
        showTyping();
        loading = true;
        sendBtn.disabled = true;
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + API_KEY
            },
            body: JSON.stringify({
                model: MODEL,
                messages: conversation,
                stream: false,
                temperature: 0.7,
                max_tokens: 1200
            })
        })
            .then(function (res) {
                if (!res.ok) {
                    return res.text().then(function (t) {
                        throw new Error('HTTP ' + res.status + (t ? ' ' + t.slice(0, 200) : ''));
                    });
                }
                return res.json();
            })
            .then(function (data) {
                if (mySession !== sessionId) return;
                var reply = data && data.choices && data.choices[0] &&
                    data.choices[0].message && data.choices[0].message.content;
                hideTyping();
                if (!reply) reply = '（熵熵有点走神了，再试一次吧～）';
                reply = String(reply)
                    .replace(/\*\*/g, '')
                    .replace(/\*/g, '')
                    .replace(/^#{1,6}\s+/gm, '');
                addMessage('bot', reply);
                conversation.push({ role: 'assistant', content: reply });
            })
            .catch(function (err) {
                if (mySession !== sessionId) return;
                hideTyping();
                addMessage('bot', '😵 哎呀，出错了：' + (err && err.message ? err.message : '网络或密钥问题，请检查后重试。'));
                console.error('[熵熵] 请求失败:', err);
            })
            .finally(function () {
                loading = false;
                sendBtn.disabled = false;
                input.focus();
            });
    }
    sendBtn.addEventListener('click', send);
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    });
    input.addEventListener('input', autoResize);
    root.style.left = Math.max(0, window.innerWidth - AVATAR_SIZE - 20) + 'px';
    root.style.top = Math.max(0, window.innerHeight - AVATAR_SIZE - 20) + 'px';
    setTimeout(function () {
        var hint = document.createElement('div');
        hint.className = 'ss-hint';
        hint.textContent = '点我提问';
        root.appendChild(hint);
        setTimeout(function () {
            if (hint.parentNode) hint.parentNode.removeChild(hint);
        }, 3500);
    }, 1200);
    console.log('🤖 熵熵智能体已上线（可拖动，点击头像召唤）');
})();
