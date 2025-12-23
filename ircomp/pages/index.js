import { useState } from 'react'

const ADMIN_WHATSAPP = '6285298747600'

export default function Home() {
  const [nama, setNama] = useState('')
  const [nowa, setNowa] = useState('')
  const [budget, setBudget] = useState('')
  const [kebutuhan, setKebutuhan] = useState('Gaming')
  const [spek, setSpek] = useState('')
  const [catatan, setCatatan] = useState('')
  const [preview, setPreview] = useState('')

  function formatPesan() {
    return `\nHalo Admin IR Computer 👋\nSaya ingin konsultasi rakit PC.\n\n👤 Nama: ${nama}\n📞 Nomor WA: ${nowa}\n💸 Budget: ${budget}\n🎯 Kebutuhan: ${kebutuhan}\n\n📦 Spek Yang Diinginkan:\n${spek}\n\n📝 Catatan Tambahan:\n${catatan}\n\nMohon rekomendasi PC terbaiknya ya 🙏\n`
  }

  function handlePreview() {
    setPreview(formatPesan())
  }

  async function handleCopy() {
    if (!preview) handlePreview()
    try {
      await navigator.clipboard.writeText(preview || formatPesan())
      alert('Pesan disalin!')
    } catch (e) {
      alert('Gagal menyalin — izinkan akses clipboard.')
    }
  }

  function handleKirim() {
    const pesan = encodeURIComponent(formatPesan())
    window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${pesan}`, '_blank')
  }

  return (
    <div className="container">
      <h2>Form Rakit PC</h2>
      <p className="header-sub">IR Computer — Konsultasi Cepat via WhatsApp</p>

      <label>Nama Kamu:</label>
      <input value={nama} onChange={(e) => setNama(e.target.value)} />

      <label>Nomor WhatsApp Kamu:</label>
      <input value={nowa} onChange={(e) => setNowa(e.target.value)} />

      <label>Budget Kamu:</label>
      <input value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="contoh: 5 juta / 8 juta / 12 juta" />

      <label>Kebutuhan Utama:</label>
      <select value={kebutuhan} onChange={(e) => setKebutuhan(e.target.value)}>
        <option value="Gaming">Gaming</option>
        <option value="Editing/Design">Editing / Design</option>
        <option value="Kantoran / Sekolah">Kantoran / Sekolah</option>
        <option value="Streaming">Streaming</option>
        <option value="All Rounder">All Rounder</option>
      </select>

      <label>Spek yang Diinginkan (opsional):</label>
      <textarea rows={3} value={spek} onChange={(e) => setSpek(e.target.value)} placeholder="Contoh: Ryzen 5, RTX 3060, RAM 16GB..."></textarea>

      <label>Catatan Tambahan:</label>
      <textarea rows={3} value={catatan} onChange={(e) => setCatatan(e.target.value)}></textarea>

      <button onClick={handlePreview}>Preview Pesan</button>
      <button className="secondary" onClick={handleCopy}>Salin Pesan</button>
      <button onClick={handleKirim}>Kirim via WhatsApp</button>

      <textarea id="preview" rows={6} readOnly value={preview} placeholder="Preview pesan muncul di sini..."></textarea>
    </div>
  )
}
