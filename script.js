// 模拟数据
const mockData = {
    sampleWork: {
        id: 'CSCC-20231105-0001',
        title: '《湘江晨曦》',
        author: '小王',
        hash: '0x9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a',
        timestamp: '2023-11-05 14:30:25',
        blockHeight: 789012,
        watermarkId: 'WID:A1B2-C3D4-E5F6'
    },
    infringements: [
        { date: '2023-11-06 10:15:00', url: 'example-infringement.com', location: '北京', x: '30%', y: '40%', severity: 'high', matches: 1, evidence: ['screenshot1.jpg'] },
        { date: '2023-11-06 14:20:00', url: 'social-platform.com', location: '上海', x: '65%', y: '45%', severity: 'medium', matches: 2, evidence: [] },
        { date: '2023-11-07 09:05:00', url: 'shop.example.com', location: '广州', x: '55%', y: '60%', severity: 'high', matches: 3, evidence: ['capture1.png'] },
        { date: '2023-11-07 12:30:00', url: 'blog.example.com', location: '成都', x: '40%', y: '70%', severity: 'low', matches: 1, evidence: [] },
        { date: '2023-11-08 08:20:00', url: 'market.example.com', location: '深圳', x: '70%', y: '50%', severity: 'medium', matches: 1, evidence: ['evidence.zip'] },
        { date: '2023-11-08 16:45:00', url: 'forum.example.com', location: '北京', x: '32%', y: '42%', severity: 'low', matches: 1, evidence: [] },
        { date: '2023-11-09 11:10:00', url: 'img-host.com/123', location: '上海', x: '66%', y: '48%', severity: 'high', matches: 4, evidence: ['img1.png'] },
        { date: '2023-11-09 13:40:00', url: 'social2.com', location: '杭州', x: '50%', y: '35%', severity: 'medium', matches: 2, evidence: [] },
        { date: '2023-11-10 09:30:00', url: 'shop2.example.com', location: '广州', x: '53%', y: '62%', severity: 'low', matches: 1, evidence: [] },
        { date: '2023-11-10 15:25:00', url: 'news.example.com', location: '武汉', x: '45%', y: '55%', severity: 'medium', matches: 1, evidence: [] },
        { date: '2023-11-11 10:00:00', url: 'duplicate.example.com', location: '成都', x: '42%', y: '68%', severity: 'high', matches: 5, evidence: ['evidence1.zip'] },
        { date: '2023-11-11 18:00:00', url: 'gallery.example.com', location: '重庆', x: '35%', y: '58%', severity: 'low', matches: 1, evidence: [] }
    ],
    stats: {
        works: 1234567,
        blocks: 789012,
        warnings: 45678,
        partners: 15
    }
};

// 路由系统
function navigateTo(pageHash) {
    window.location.hash = pageHash;
}

function handleRouting() {
    const hash = window.location.hash || '#home';
    const allPages = document.querySelectorAll('.page');

    // 隐藏所有页面
    allPages.forEach(page => page.classList.remove('active'));

    // 显示对应页面
    const pageId = hash.substring(1) + '-page';
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        updateNavActive(hash);
        // 页面进入后的行为
        if (pageId === 'home-page') animateStats();
        if (pageId === 'certificate-page') setTimeout(animateBlockchain, 300);
        if (pageId === 'monitor-page') renderInfringementMap();
    }
}

// 上传存证页面绑定
function setupUploadPage() {
    const uploadZone = document.getElementById('upload-zone');
    if (!uploadZone) return;

    uploadZone.addEventListener('click', () => simulateFileUpload());
    // 支持键盘触发 Enter / Space
    uploadZone.addEventListener('keydown', (e)=>{
        if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); simulateFileUpload(); }
    });

    // 拖拽效果
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadZone.addEventListener(eventName, preventDefaults, false);
    });
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadZone.addEventListener(eventName, () => uploadZone.classList.add('drag-over'), false);
    });
    ['dragleave', 'drop'].forEach(eventName => {
        uploadZone.addEventListener(eventName, () => uploadZone.classList.remove('drag-over'), false);
    });
}

// 模拟选择文件并启动存证流程
function simulateFileUpload() {
    showModal('准备上传...', '正在选择文件');
    setTimeout(() => {
        updateModalContent('上传成功，正在存证...');
        simulateAttestation();
    }, 600);
}

// 模拟存证过程
function simulateAttestation() {
    showModal('存证中...', '请稍候');

    // 步骤1: 生成数字指纹
    setTimeout(() => {
        updateModalContent('正在生成数字指纹...<br><code>' + mockData.sampleWork.hash.substring(0, 20) + '...</code>');
    }, 700);

    // 步骤2: 上链打包
    setTimeout(() => {
        updateModalContent('正在打包至区块链...<br><div class="blockchain-visual"><div class="block">#' + (mockData.sampleWork.blockHeight - 2) + '</div><div class="block">#' + (mockData.sampleWork.blockHeight -1) + '</div><div class="block active">#' + mockData.sampleWork.blockHeight + '</div></div>');
    }, 1400);

    // 步骤3: 完成
    setTimeout(() => {
        updateModalContent('<div class="success-message">✓ 存证成功！</div><p>证书已生成</p>');
        setTimeout(() => {
            closeModal();
            renderCertificate(mockData.sampleWork);
            navigateTo('#certificate');
        }, 900);
    }, 2200);
}

// 区块链动画（在证书页）
function animateBlockchain() {
    const blocks = document.querySelectorAll('.blockchain-visual .block');
    blocks.forEach((block, index) => {
        block.classList.remove('active');
        setTimeout(() => block.classList.add('active'), index * 450);
    });
}

// 侵权地图渲染
function renderInfringementMap() {
    const map = document.getElementById('infringement-map');
    if (!map) return;

    // 显示骨架加载
    map.innerHTML = '<div class="skeleton" style="width:100%;height:100%"></div>';
    setTimeout(() => {
        map.innerHTML = '';
        // 添加侵权点
        mockData.infringements.forEach(inf => {
            const dot = document.createElement('div');
            dot.className = 'infringement-dot';
            dot.style.left = inf.x;
            dot.style.top = inf.y;
            dot.title = `${inf.location}: ${inf.url}`;
            map.appendChild(dot);
        });

        // 渲染列表
        const list = document.getElementById('infringement-list');
        if (list) {
            list.innerHTML = '';
            mockData.infringements.forEach(inf => {
                const row = document.createElement('div');
                row.className = 'infringement-row';
                row.innerHTML = `<div class="inf-date">${inf.date}</div><div class="inf-url">${inf.url}</div><div class="inf-loc">${inf.location}</div><div class="inf-actions"><button class="btn" data-url="${inf.url}">查看</button> <button class="btn">取证</button></div>`;
                list.appendChild(row);
            });
        }
    }, 400);
}

// --- Monitor: table, chart, filters, pagination ---
let monitorState = { page: 1, perPage: 6, filter: '', city: '' };

function setupMonitor() {
    populateCityFilter();
    renderMonitorOverview();
    renderMonitorChart();
    renderMonitorTable();
    bindMonitorControls();
}

function populateCityFilter(){
    const cities = Array.from(new Set(mockData.infringements.map(i=>i.location)));
    const sel = document.getElementById('monitor-city');
    if(!sel) return;
    cities.forEach(c=>{ const opt=document.createElement('option'); opt.value=c; opt.textContent=c; sel.appendChild(opt); });
}

function getFiltered(){
    return mockData.infringements.filter(i=>{
        if(monitorState.filter){ const q=monitorState.filter.toLowerCase(); if(!(i.url.toLowerCase().includes(q) || i.location.toLowerCase().includes(q))) return false; }
        if(monitorState.city && i.location !== monitorState.city) return false;
        return true;
    }).sort((a,b)=> new Date(b.date) - new Date(a.date));
}

function renderMonitorOverview(){
    const items = mockData.infringements;
    const acc = items.length;
    const warns = items.filter(i=>i.severity==='high').length;
    const loss = (items.reduce((s,i)=> s + (i.matches*200),0)).toLocaleString();
    const coverage = 98;
    document.getElementById('mon-acc').textContent = acc.toLocaleString();
    document.getElementById('mon-warn').textContent = warns.toLocaleString();
    document.getElementById('mon-loss').textContent = loss;
    document.getElementById('mon-coverage').textContent = coverage + '%';
}

function renderMonitorChart(){
    const canvas = document.getElementById('monitor-chart');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // aggregate by date (day)
    const counts = {};
    mockData.infringements.forEach(i=>{ const d=i.date.split(' ')[0]; counts[d]=(counts[d]||0)+1; });
    const dates = Object.keys(counts).sort();
    const vals = dates.map(d=>counts[d]);
    const max = Math.max(...vals,1);
    // draw grid
    ctx.strokeStyle = '#eee'; ctx.lineWidth=1;
    for(let y=0;y<5;y++){ const yy = canvas.height - (y*(canvas.height/4)); ctx.beginPath(); ctx.moveTo(0,yy); ctx.lineTo(canvas.width,yy); ctx.stroke(); }
    // draw line
    ctx.beginPath();
    dates.forEach((d,i)=>{
        const x = (i/(dates.length-1 || 1)) * canvas.width;
        const y = canvas.height - (vals[i]/max) * (canvas.height - 20) -10;
        if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    });
    ctx.strokeStyle = '#2E8B57'; ctx.lineWidth=2; ctx.stroke();
}

function renderMonitorTable(){
    const rows = getFiltered();
    const tbody = document.querySelector('#infringement-table tbody');
    if(!tbody) return;
    const total = rows.length;
    const pages = Math.max(1, Math.ceil(total / monitorState.perPage));
    monitorState.page = Math.min(monitorState.page, pages);
    const start = (monitorState.page-1)*monitorState.perPage;
    const pageRows = rows.slice(start, start+monitorState.perPage);
    tbody.innerHTML = '';
    pageRows.forEach(r=>{
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${r.date}</td><td>${r.url}</td><td>${r.location}</td><td>${r.severity}</td><td><button class="btn" data-url="${r.url}">查看</button></td>`;
        tbody.appendChild(tr);
    });
    document.getElementById('page-info').textContent = `${monitorState.page} / ${pages}`;
}

function bindMonitorControls(){
    const search = document.getElementById('monitor-search');
    const city = document.getElementById('monitor-city');
    const prev = document.getElementById('prev-page');
    const next = document.getElementById('next-page');
    const refresh = document.getElementById('monitor-refresh');
    if(search) search.addEventListener('input', (e)=>{ monitorState.filter = e.target.value; monitorState.page=1; renderMonitorTable(); renderInfringementMap(); });
    if(city) city.addEventListener('change', (e)=>{ monitorState.city = e.target.value; monitorState.page=1; renderMonitorTable(); renderInfringementMap(); });
    if(prev) prev.addEventListener('click', ()=>{ if(monitorState.page>1){ monitorState.page--; renderMonitorTable(); } });
    if(next) next.addEventListener('click', ()=>{ monitorState.page++; renderMonitorTable(); });
    if(refresh) refresh.addEventListener('click', ()=>{ renderMonitorOverview(); renderMonitorChart(); renderMonitorTable(); renderInfringementMap(); });

    // delegate table view buttons to open modal (guard tbody)
    const tbodyDeleg = document.querySelector('#infringement-table tbody');
    if (tbodyDeleg) {
        tbodyDeleg.addEventListener('click', (e)=>{
            const btn = e.target.closest('button');
            if(btn && btn.dataset.url){ const url = btn.dataset.url; const rec = mockData.infringements.find(i=>i.url===url); if(rec) showInfringementDetail(rec); }
        });
    }
}

function showInfringementDetail(rec){
    const content = `<div><strong>${rec.url}</strong><p>城市：${rec.location}</p><p>时间：${rec.date}</p><p>风险：${rec.severity}</p><p>匹配数：${rec.matches}</p><div style="margin-top:8px"><button class=\"btn-primary\" onclick=\"closeModal();\">取证并下载证据包</button> <button class=\"btn\" onclick=\"closeModal();\">联系权利人</button></div></div>`;
    showModal('侵权详情', content);
}

// 数据看板数字动画
function animateStats() {
    const mapping = {
        'stat-works': mockData.stats.works,
        'stat-blocks': mockData.stats.blocks,
        'stat-warnings': mockData.stats.warnings,
        'stat-partners': mockData.stats.partners
    };
    Object.keys(mapping).forEach(id => {
        const el = document.getElementById(id);
        if (el) animateCounter(el, 0, mapping[id], 1200);
    });
}

function animateCounter(element, start, end, duration) {
    let startTime = null;
    function animationStep(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        const easeOutQuad = t => t * (2 - t);
        const current = Math.floor(start + (end - start) * easeOutQuad(percentage));
        element.textContent = current.toLocaleString();
        if (percentage < 1) requestAnimationFrame(animationStep);
    }
    requestAnimationFrame(animationStep);
}

// 模态框工具函数
function showModal(title, content) {
    closeModal();
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    modal.innerHTML = `
        <div class="modal" role="document">
            <h3 id="modal-title">${title}</h3>
            <div class="modal-content" aria-live="polite">${content}</div>
            <div class="modal-actions"><button id="modal-close" class="btn-close">关闭</button></div>
        </div>`;
    document.getElementById('modal-container').appendChild(modal);
    // show animation
    const inner = modal.querySelector('.modal');
    setTimeout(()=> inner.classList.add('show'), 20);
    // focus trap basics
    const closeBtn = document.getElementById('modal-close');
    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length-1];
    const prevActive = document.activeElement;
    if (firstFocusable) firstFocusable.focus();
    function trap(e){
        if (e.key === 'Tab'){
            if (e.shiftKey && document.activeElement === firstFocusable){ e.preventDefault(); lastFocusable.focus(); }
            else if (!e.shiftKey && document.activeElement === lastFocusable){ e.preventDefault(); firstFocusable.focus(); }
        }
    }
    modal._trap = trap;
    document.addEventListener('keydown', trap);
    closeBtn.addEventListener('click', ()=>{ closeModal(); if(prevActive) prevActive.focus(); });
}

function updateModalContent(content) {
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) modalContent.innerHTML = content;
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) modal.remove();
}

// enhance closeModal to remove key handler if present
const _origClose = closeModal;
closeModal = function(){
    const modal = document.querySelector('.modal-overlay');
    if (modal && modal._trap) document.removeEventListener('keydown', modal._trap);
    _origClose();
};

// 监听 ESC 关闭模态
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// 初始化
window.onload = function() {
    handleRouting();
    window.onhashchange = handleRouting;
    setupUploadPage();
    setupVerifyPage();
    // 高级面板 toggle 如果存在
    const advToggle = document.getElementById('toggle-advanced');
    if (advToggle) advToggle.addEventListener('click', () => {
        const panel = document.getElementById('advanced-panel');
        if (!panel) return;
        panel.classList.toggle('open');
        const opened = panel.classList.contains('open');
        advToggle.textContent = opened ? '高级选项 ▴' : '高级选项 ▾';
        advToggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
    });
    // setup monitor after DOM ready
    setupMonitor();
};

// 渲染证书数据到 DOM
function renderCertificate(data) {
    const idEl = document.getElementById('cert-id');
    const titleEl = document.getElementById('cert-title');
    const authorEl = document.getElementById('cert-author');
    const timeEl = document.getElementById('cert-time');
    const hashEl = document.getElementById('cert-hash');
    const blocksEl = document.getElementById('cert-blocks');
    const thumb = document.getElementById('cert-thumb');

    if (idEl) idEl.textContent = '证书编号: ' + data.id;
    if (titleEl) titleEl.textContent = data.title;
    if (authorEl) authorEl.textContent = data.author;
    if (timeEl) timeEl.textContent = data.timestamp;
    if (hashEl) { hashEl.textContent = data.hash.substring(0,20) + '...'; hashEl.setAttribute('data-full', data.hash); }
    if (thumb) thumb.textContent = data.title;
    if (blocksEl) blocksEl.innerHTML = `<div class="block">#${data.blockHeight - 2}</div><div class="block">#${data.blockHeight -1}</div><div class="block active">#${data.blockHeight}</div>`;

    // 点击展开哈希
    if (hashEl) {
        hashEl.addEventListener('click', () => {
            const full = hashEl.getAttribute('data-full');
            const expanded = hashEl.classList.toggle('expanded');
            hashEl.textContent = expanded ? full : (full.substring(0,20) + '...');
        });
    }
}

// 验证页面绑定（拖拽/点击）
function setupVerifyPage() {
    const vzone = document.getElementById('verify-upload-zone');
    if (!vzone) return;
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        vzone.addEventListener(eventName, preventDefaults, false);
    });
    ['dragenter', 'dragover'].forEach(eventName => vzone.addEventListener(eventName, () => vzone.classList.add('drag-over'), false));
    ['dragleave', 'drop'].forEach(eventName => vzone.addEventListener(eventName, () => vzone.classList.remove('drag-over'), false));
    vzone.addEventListener('click', simulateVerify);
    vzone.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); simulateVerify(); } });
}

// 模拟查验流程
function simulateVerify() {
    showModal('查验中...', '正在提取水印并比对版权库');
    setTimeout(() => {
        updateModalContent('匹配成功：发现受保护水印');
        setTimeout(() => {
            closeModal();
            document.getElementById('result-alert').style.display = 'block';
            // 自动隐藏警报条
            setTimeout(()=>{ const a=document.getElementById('result-alert'); if(a) a.style.display='none'; },5000);
            document.getElementById('uploaded-status').textContent = '状态：未获授权';
            const stored = document.getElementById('stored-thumb'); if (stored) stored.textContent = mockData.sampleWork.title;
            const owner = document.getElementById('result-owner'); if (owner) owner.textContent = mockData.sampleWork.author;
            const wid = document.getElementById('result-watermark'); if (wid) wid.textContent = mockData.sampleWork.watermarkId;
            const timeline = document.getElementById('result-timeline');
            if (timeline) timeline.innerHTML = `<div>${mockData.infringements.map(i=>`● ${i.date} 发现于 ${i.url}`).join('<br>')}</div>`;
            navigateTo('#result');
        }, 800);
    }, 900);
}

// 工具函数
function preventDefaults(e) { e.preventDefault(); e.stopPropagation(); }

function updateNavActive(hash) {
    document.querySelectorAll('.nav-links a').forEach(link => link.classList.toggle('active', link.getAttribute('href') === hash));
}

// 按钮 loading helper
function setButtonLoading(btn, loading=true, text='处理中...'){
    if(!btn) return;
    if(loading){ btn.dataset.orig = btn.textContent; btn.disabled=true; btn.textContent = text; }
    else { btn.disabled=false; btn.textContent = btn.dataset.orig || btn.textContent; }
}