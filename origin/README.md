[index.html](https://github.com/user-attachments/files/30129358/index.html)
# my-first-web<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Belajar bahasa Korea untuk penutur bahasa Indonesia, sedikit demi sedikit setiap hari.">
    <title>Hanguk Step | Belajar Bahasa Korea</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- 키보드 사용자가 메뉴를 건너뛰고 본문으로 이동할 수 있는 링크 -->
    <a class="skip-link" href="#main-content">Langsung ke isi utama</a>

    <!-- =====================================================
         1. 헤더
    ====================================================== -->
    <header class="site-header" id="beranda">
        <div class="container header-inner">
            <a class="brand" href="#beranda" aria-label="Hanguk Step, kembali ke beranda">
                <span class="brand-mark" aria-hidden="true"><span>ㅎ</span></span>
                <span class="brand-copy">
                    <strong>Hanguk Step</strong>
                    <small>Korean, one step at a time</small>
                </span>
            </a>

            <button class="menu-toggle" id="menu-toggle" type="button" aria-label="Buka menu" aria-expanded="false" aria-controls="main-menu">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <nav class="main-menu" id="main-menu" aria-label="Navigasi utama">
                <a href="#beranda">Beranda</a>
                <a href="#kurikulum">Kurikulum</a>
                <a href="#belajar">Ruang Belajar</a>
                <a href="#cara-belajar">Cara Belajar</a>
                <a class="nav-cta" href="#belajar">Mulai Belajar</a>
            </nav>
        </div>
    </header>

    <main id="main-content">
        <!-- =====================================================
             2. 메인 히어로 영역
        ====================================================== -->
        <section class="hero section-space">
            <div class="hero-orb hero-orb-one" aria-hidden="true"></div>
            <div class="hero-orb hero-orb-two" aria-hidden="true"></div>

            <div class="container hero-grid">
                <div class="hero-copy reveal">
                    <p class="eyebrow"><span></span> Bahasa Korea untuk penutur Indonesia</p>
                    <h1>Belajar sedikit,<br><em>maju setiap hari.</em></h1>
                    <p class="hero-description">
                        Kuasai 10 kosakata dan 5 kalimat praktis setiap hari. Dengarkan, pahami, lalu ucapkan dengan percaya diri.
                    </p>

                    <div class="hero-actions">
                        <a class="button button-primary" href="#belajar">
                            Mulai Day 1
                            <span aria-hidden="true">→</span>
                        </a>
                        <a class="button button-secondary" href="#kurikulum">Lihat rencana belajar</a>
                    </div>

                    <div class="hero-proof" aria-label="Ringkasan materi">
                        <div class="avatar-stack" aria-hidden="true">
                            <span>가</span><span>나</span><span>다</span>
                        </div>
                        <p><strong>3 hari pertama</strong><br>30 kata · 15 kalimat · latihan berbicara</p>
                    </div>
                </div>

                <div class="hero-visual reveal" aria-label="Contoh kartu belajar bahasa Korea">
                    <div class="floating-note note-top" aria-hidden="true">
                        <span>오늘</span>
                        <strong>Hari ini</strong>
                    </div>

                    <article class="preview-card">
                        <div class="preview-topline">
                            <span class="lesson-pill">DAY 1 · PEMULA</span>
                            <span class="preview-flag" aria-label="Korea">🇰🇷</span>
                        </div>
                        <p class="preview-label">KOSAKATA HARI INI</p>
                        <h2>안녕하세요</h2>
                        <p class="preview-romanization">annyeonghaseyo</p>
                        <div class="preview-meaning">
                            <span>Arti</span>
                            <strong>Halo</strong>
                        </div>
                        <button class="preview-listen" type="button" data-speak="안녕하세요" data-rate="0.86">
                            <span aria-hidden="true">▶</span> Dengarkan pelafalan
                        </button>
                        <div class="preview-progress">
                            <div><span>Progres hari ini</span><strong id="hero-progress-label">0%</strong></div>
                            <div class="progress-track"><span id="hero-progress-bar"></span></div>
                        </div>
                    </article>

                    <div class="floating-note note-bottom" aria-hidden="true">
                        <span class="sound-wave">▮▮▮</span>
                        <strong>Ucapkan!</strong>
                    </div>
                </div>
            </div>
        </section>

        <!-- 짧은 서비스 특징 -->
        <section class="feature-strip" aria-label="Keunggulan Hanguk Step">
            <div class="container feature-strip-grid">
                <div><span class="feature-icon">10</span><p><strong>Kata pilihan</strong><small>setiap hari</small></p></div>
                <div><span class="feature-icon">5</span><p><strong>Kalimat praktis</strong><small>untuk percakapan</small></p></div>
                <div><span class="feature-icon">🔊</span><p><strong>Audio Korea</strong><small>normal &amp; pelan</small></p></div>
                <div><span class="feature-icon">🎤</span><p><strong>Latihan bicara</strong><small>dengan mikrofon</small></p></div>
            </div>
        </section>

        <!-- =====================================================
             3. Day 1~3 커리큘럼
        ====================================================== -->
        <section class="curriculum section-space" id="kurikulum">
            <div class="container">
                <div class="section-heading reveal">
                    <div>
                        <p class="eyebrow"><span></span> Rencana belajar</p>
                        <h2>Tiga hari, tiga situasi nyata.</h2>
                    </div>
                    <p>Setiap pelajaran dibuat singkat agar kamu bisa belajar konsisten tanpa merasa kewalahan.</p>
                </div>

                <!-- JavaScript가 아래에 Day 카드를 자동으로 만들어 준다. -->
                <div class="day-card-grid" id="day-card-grid"></div>
            </div>
        </section>

        <!-- =====================================================
             4. 실제 학습 공간
        ====================================================== -->
        <section class="learning-section section-space" id="belajar">
            <div class="container">
                <div class="learning-shell reveal">
                    <aside class="day-sidebar">
                        <div class="sidebar-heading">
                            <p>PROGRAM DASAR</p>
                            <strong>Langkah Pertama</strong>
                        </div>

                        <!-- JavaScript가 Day 선택 버튼을 자동으로 만든다. -->
                        <div class="day-navigation" id="day-navigation"></div>

                        <div class="sidebar-tip">
                            <span aria-hidden="true">💡</span>
                            <p><strong>Tips belajar</strong>Dengarkan setiap kata setidaknya dua kali.</p>
                        </div>
                    </aside>

                    <div class="lesson-area">
                        <div class="lesson-heading">
                            <div>
                                <div class="lesson-meta">
                                    <span id="lesson-day-badge">DAY 1</span>
                                    <span id="lesson-level">Pemula</span>
                                </div>
                                <h2 id="lesson-title">Perkenalan Diri</h2>
                                <p id="lesson-description">Mulai percakapan dan perkenalkan dirimu dalam bahasa Korea.</p>
                            </div>
                            <div class="lesson-progress-box" aria-label="Progres pelajaran">
                                <div class="progress-ring" id="progress-ring"><span id="lesson-progress-label">0%</span></div>
                                <p>Progres<br>pelajaran</p>
                            </div>
                        </div>

                        <!-- 단어 → 문장 → 말하기 단계를 선택하는 버튼 -->
                        <div class="stage-tabs" role="tablist" aria-label="Tahap belajar">
                            <button class="stage-tab active" type="button" role="tab" aria-selected="true" data-stage="vocabulary">
                                <span>01</span> Kosakata
                            </button>
                            <button class="stage-tab" type="button" role="tab" aria-selected="false" data-stage="sentences">
                                <span>02</span> Kalimat
                            </button>
                            <button class="stage-tab" type="button" role="tab" aria-selected="false" data-stage="speaking">
                                <span>03</span> Berbicara
                            </button>
                        </div>

                        <!-- 선택한 단계의 내용이 이 안에 표시된다. -->
                        <div class="lesson-content" id="lesson-content" role="tabpanel" aria-live="polite"></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- =====================================================
             5. 공부 방법 안내
        ====================================================== -->
        <section class="method-section section-space" id="cara-belajar">
            <div class="container method-grid">
                <div class="method-copy reveal">
                    <p class="eyebrow"><span></span> Cara belajar</p>
                    <h2>Jangan hanya menghafal. Gunakan kata itu.</h2>
                    <p>Kosakata akan lebih mudah diingat ketika kamu mendengarnya di dalam kalimat dan mencoba mengucapkannya sendiri.</p>
                    <a class="text-link" href="#belajar">Coba pelajaran pertama <span>→</span></a>
                </div>

                <ol class="method-list reveal">
                    <li><span>01</span><div><strong>Kenali katanya</strong><p>Lihat tulisan Korea, arti, dan cara membacanya.</p></div></li>
                    <li><span>02</span><div><strong>Dengarkan kalimatnya</strong><p>Bandingkan audio normal dan versi yang lebih pelan.</p></div></li>
                    <li><span>03</span><div><strong>Ucapkan sendiri</strong><p>Aktifkan mikrofon dan periksa teks yang dikenali browser.</p></div></li>
                </ol>
            </div>
        </section>

        <!-- 마지막 행동 유도 영역 -->
        <section class="final-cta">
            <div class="container final-cta-inner reveal">
                <div>
                    <span>오늘도 한 걸음</span>
                    <h2>Satu langkah hari ini,<br>lebih lancar besok.</h2>
                </div>
                <a class="button button-light" href="#belajar">Mulai sekarang <span>→</span></a>
            </div>
        </section>
    </main>

    <!-- =====================================================
         6. 푸터
    ====================================================== -->
    <footer class="site-footer">
        <div class="container footer-inner">
            <a class="brand footer-brand" href="#beranda">
                <span class="brand-mark" aria-hidden="true"><span>ㅎ</span></span>
                <span class="brand-copy"><strong>Hanguk Step</strong><small>Korean, one step at a time</small></span>
            </a>
            <p>Dibuat untuk pembelajar bahasa Korea di Indonesia.</p>
            <p>© 2026 Hanguk Step</p>
        </div>
    </footer>

    <div class="toast" id="toast" role="status" aria-live="polite"></div>

    <script src="script.js"></script>
</body>
</html>
