import { useState } from "react";
import {
  Sparkles, LayoutDashboard, FolderKanban, Images, Settings, Bell, Search,
  Plus, Upload, WandSparkles, ChevronRight, Image as ImageIcon, Mic, Send,
  Menu, X, CheckCircle2
} from "lucide-react";

const sections = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "studio", label: "Project Studio", icon: FolderKanban },
  { id: "gallery", label: "Koleksi Desain", icon: Images },
  { id: "settings", label: "Pengaturan", icon: Settings },
];

function Field({ label, placeholder, multiline = false }: { label: string; placeholder: string; multiline?: boolean }) {
  return <label className="field"><span>{label}</span>{multiline ? <textarea placeholder={placeholder} /> : <input placeholder={placeholder} />}</label>;
}

function App() {
  const [active, setActive] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-shell">
      <aside className={mobileOpen ? "sidebar open" : "sidebar"}>
        <div className="brand"><div className="brand-mark"><Sparkles size={19}/></div><div><strong>Seiko Studio</strong><small>AI Design & Printing</small></div></div>
        <nav>{sections.map(({id,label,icon:Icon}) => <button key={id} className={active===id ? "nav-item active":"nav-item"} onClick={()=>{setActive(id);setMobileOpen(false)}}><Icon size={18}/><span>{label}</span></button>)}</nav>
        <div className="credit-card"><div className="credit-top"><span>AI Credits</span><Sparkles size={16}/></div><strong>120</strong><small>credits tersedia</small><button onClick={()=>setActive("settings")}>Kelola Credits <ChevronRight size={14}/></button></div>
        <div className="sidebar-foot">Seiko Studio v0.1<br/><span>Workspace siap digunakan</span></div>
      </aside>
      {mobileOpen && <button className="backdrop" aria-label="Tutup menu" onClick={()=>setMobileOpen(false)} />}
      <main className="main">
        <header className="topbar"><button className="mobile-menu" onClick={()=>setMobileOpen(true)}><Menu/></button><div className="search"><Search size={17}/><input placeholder="Cari project, desain, pelanggan..." /></div><div className="top-actions"><button className="icon-btn"><Bell size={18}/><i/></button><div className="avatar">S</div></div></header>
        {active === "dashboard" && <Dashboard onStudio={()=>setActive("studio")} />}
        {active === "studio" && <Studio />}
        {active === "gallery" && <Placeholder title="Koleksi Desain" text="Semua hasil desain dan versi revisi akan tersimpan di sini." />}
        {active === "settings" && <Placeholder title="Pengaturan" text="Pengaturan workspace, akun, AI credits, dan preferensi produksi." />}
      </main>
    </div>
  );
}

function Dashboard({ onStudio }: { onStudio: () => void }) {
  return <div className="content">
    <section className="hero"><div><p className="eyebrow"><Sparkles size={15}/> AI DESIGN WORKSPACE</p><h1>Wujudkan ide menjadi<br/><em>desain siap cetak.</em></h1><p className="hero-copy">Susun brief, masukkan bahan visual, lalu biarkan Seiko Studio membantu merancang konsep desain secara terstruktur.</p><button className="primary" onClick={onStudio}><Plus size={17}/> Buat Project Baru</button></div><div className="hero-art"><div className="art-card back"></div><div className="art-card mid"></div><div className="art-card front"><Sparkles size={34}/><strong>PROJECT<br/>STUDIO</strong><span>AI • DESIGN • PRINT</span></div></div></section>
    <div className="section-head"><div><h2>Mulai dari sini</h2><p>Alur kerja sederhana untuk setiap project.</p></div></div>
    <div className="quick-grid"><Quick icon={<FolderKanban/>} title="Project Studio" text="Buat brief desain lengkap." onClick={onStudio}/><Quick icon={<WandSparkles/>} title="AI Prompt Engine" text="Ubah brief menjadi prompt terstruktur."/><Quick icon={<Images/>} title="Koleksi Desain" text="Simpan konsep dan hasil final."/><Quick icon={<ImageIcon/>} title="Bahan Visual" text="Kelola logo, foto, dan referensi." /></div>
    <div className="workflow"><span>1. BRIEF</span><ChevronRight/><span>2. AI PROMPT</span><ChevronRight/><span>3. DESAIN</span><ChevronRight/><span>4. REVIEW</span><ChevronRight/><span>5. SIAP CETAK</span></div>
  </div>;
}

function Quick({icon,title,text,onClick}:{icon:React.ReactNode;title:string;text:string;onClick?:()=>void}) {
 return <button className="quick" onClick={onClick}><div className="quick-icon">{icon}</div><div><strong>{title}</strong><p>{text}</p></div><ChevronRight className="quick-arrow"/></button>
}

function Studio() {
  const [generated, setGenerated] = useState(false);
  return <div className="content">
    <div className="page-head"><div><p className="eyebrow">PROJECT STUDIO</p><h1>Buat Project Desain</h1><p>Lengkapi brief. Seiko Studio akan menyusunnya menjadi prompt desain yang siap diproses AI.</p></div><div className="status-pill"><CheckCircle2 size={15}/> Draft tersimpan otomatis</div></div>
    <div className="studio-grid">
      <div className="studio-form">
        <Section n="01" title="Data Informasi (Teks)"><Field label="Judul Utama" placeholder="Contoh: Promo Merdeka"/><Field label="Sub-Judul" placeholder="Contoh: Diskon hingga 50%"/><Field label="Informasi Data / Deskripsi" placeholder="Detail penawaran, harga, syarat, periode promo, dan informasi penting lainnya..." multiline/><Field label="Slogan" placeholder="Contoh: Cepat, Murah, Enak"/></Section>
        <Section n="02" title="Panel Kontak & Alamat"><div className="two-col"><Field label="WhatsApp" placeholder="08xxxxxxxxxx"/><Field label="Instagram" placeholder="@username"/><Field label="YouTube" placeholder="youtube.com/..."/><Field label="TikTok" placeholder="@username"/><Field label="Facebook" placeholder="facebook.com/..."/><Field label="Alamat" placeholder="Alamat lengkap"/></div><Field label="Kontak Lain / Tambahan" placeholder="Website, email, nomor telepon, dll."/></Section>
        <Section n="03" title="Bahan Visual"><UploadBox title="Upload Logo" hint="PNG / JPG • bisa lebih dari satu"/><UploadBox title="Foto Produk" hint="PNG / JPG • bisa lebih dari satu"/><Field label="Daftar Nama Produk" placeholder="Isi jika foto produk tidak ada / belum lengkap"/><UploadBox title="Elemen Pendukung Lain" hint="Ikon, ornamen, QR, gambar tambahan"/></Section>
        <Section n="04" title="Spesifikasi & Referensi"><div className="two-col"><Field label="Orientasi" placeholder="Landscape"/><Field label="Ukuran Desain" placeholder="Contoh: 3 x 1 m"/><Field label="Warna Dominan" placeholder="Contoh: Merah, putih, emas"/><Field label="Tema Desain" placeholder="Contoh: Modern, elegan"/></div><UploadBox title="Upload Referensi Desain" hint="PNG / JPG / WebP • opsional"/></Section>
        <Section n="05" title="Prompt Pendukung & Perintah Khusus"><Field label="Instruksi Tambahan" placeholder="Contoh: Produk utama harus paling menonjol..." multiline/></Section>
        <Section n="06" title="Instruksi & Data via Audio"><div className="audio-box"><Mic size={22}/><div><strong>Rekam atau upload audio</strong><p>MP3, WAV, M4A • penggunaan audio akan mengurangi 3 credits/prompt</p></div><button className="secondary"><Upload size={15}/> Upload</button></div></Section>
        <Section n="07" title="Data via Image"><UploadBox title="Upload screenshot / desain / WhatsApp / DM / sketsa / menu / price list" hint="PNG / JPG / WebP • atau tempel gambar dengan Ctrl+V"/><div className="action-row"><button className="secondary"><WandSparkles size={15}/> Terapkan Data ke Form Otomatis</button><button className="secondary"><ImageIcon size={15}/> Ekstrak Data</button><button className="ghost">Kosongkan Semua Data</button></div></Section>
        <button className="generate" onClick={()=>setGenerated(true)}><WandSparkles size={19}/> Generate Design Prompt <span>→</span></button>
      </div>
      <aside className="studio-side">
        <div className="side-card"><div className="side-title"><WandSparkles size={17}/> Prompt Engine</div>{generated ? <div className="prompt-ready"><CheckCircle2 size={20}/><strong>Prompt berhasil disusun</strong><p>AI telah menghubungkan informasi, bahan visual, spesifikasi, layout, dan arahan tipografi.</p><button className="primary">Lanjut ke Generate Desain</button></div> : <div className="empty-prompt"><Sparkles size={27}/><strong>Belum ada prompt</strong><p>Isi brief di sebelah kiri lalu klik Generate Design Prompt.</p></div>}</div>
        <div className="side-card preview"><div className="side-title"><ImageIcon size={17}/> Live Preview</div><div className="preview-canvas"><span>Preview desain</span><small>Akan tampil setelah konsep dibuat</small></div></div>
        <div className="side-card checklist"><div className="side-title">Alur Project</div>{["Brief desain","Bahan visual","AI Prompt","Konsep desain","Review & revisi","File siap cetak"].map((x,i)=><div className="check-row" key={x}><span>{i+1}</span>{x}<small>{i<2?"Siap":"Berikutnya"}</small></div>)}</div>
      </aside>
    </div>
  </div>
}

function Section({n,title,children}:{n:string;title:string;children:React.ReactNode}) { return <section className="form-section"><div className="form-section-head"><span>{n}</span><h2>{title}</h2></div>{children}</section> }
function UploadBox({title,hint}:{title:string;hint:string}) { return <button className="upload-box"><div className="upload-icon"><Upload size={18}/></div><div><strong>{title}</strong><p>{hint}</p></div><ChevronRight size={17}/></button> }
function Placeholder({title,text}:{title:string;text:string}) { return <div className="content"><div className="page-head"><div><p className="eyebrow">SEIKO STUDIO</p><h1>{title}</h1><p>{text}</p></div></div></div> }

export default App;