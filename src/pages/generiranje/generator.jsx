import React, { useState, useEffect } from 'react';
import { fakerHR as faker } from '@faker-js/faker';
import { 
  Database, HardHat, Factory, Building2, FileText, 
  ListChecks, Plus, Trash2, Trash 
} from 'lucide-react';

const Generator = () => {
  const [count, setCount] = useState(5);
  const [activeTab, setActiveTab] = useState('Stroj');
  const [data, setData] = useState({
    Stroj: [], Radnik: [], Poduzece: [], Gradiliste: [], Nalog: [], Stavka: []
  });

  const rucniAlati = ["Udarna bušilica", "Ubodna pila", "Stroj za rezanje betona", "Kutna brusilica", "Rotacijski čekić", "Industrijski usisavač"];

  const getRandomEntity = (type) => {
    const table = data[type];
    return table.length > 0 ? table[Math.floor(Math.random() * table.length)] : null;
  };

  const recalculateTotals = (currentStavke) => {
    setData(prev => ({
      ...prev,
      Stavka: currentStavke,
      Nalog: prev.Nalog.map(nalog => {
        const suma = currentStavke
          .filter(s => s.nalog === nalog.sifra)
          .reduce((acc, curr) => acc + parseFloat(curr.iznos), 0);
        return { ...nalog, ukupniIznos: suma.toFixed(2) };
      })
    }));
  };

  const deleteRow = (id, type) => {
    if (type === 'Nalog') {
      const noveStavke = data.Stavka.filter(s => s.nalog !== id);
      const noviNalozi = data.Nalog.filter(n => n.sifra !== id);
      setData(prev => ({ ...prev, Nalog: noviNalozi, Stavka: noveStavke }));
    } else if (type === 'Stavka') {
      const noveStavke = data.Stavka.filter((s, index) => index !== id);
      recalculateTotals(noveStavke);
    } else {
      setData(prev => ({ ...prev, [type]: prev[type].filter(item => item.sifra !== id) }));
    }
  };

  const generateData = (type) => {
    let result = [];
    const num = parseInt(count) || 1;

    if (type === 'Stavka') {
      const naloziBezStavki = data.Nalog.filter(n => !data.Stavka.some(s => s.nalog === n.sifra));
      if (naloziBezStavki.length === 0) return alert("Svi nalozi već imaju stavke!");

      const noveStavke = [];
      naloziBezStavki.forEach(nalog => {
        const brojStavki = Math.floor(Math.random() * 10) + 1;
        let sifraStavke = 1
        for (let j = 1; j <= brojStavki; j++) {
          const randomStroj = getRandomEntity('Stroj');
          const radniSati = faker.number.int({ min: 1, max: 10 });
          const cijenaSata = randomStroj ? randomStroj.cijena : 0;
          
          const pocetak = faker.date.between({ from: '2024-01-01T07:00:00', to: '2024-12-31T15:00:00' });
          const kraj = new Date(pocetak.getTime() + radniSati * 60 * 60 * 1000);

          noveStavke.push({
            nalog: nalog.sifra,
            sifra: sifraStavke++,
            sifraRadnika: getRandomEntity('Radnik')?.sifra || "N/A",
            sifraStroja: randomStroj?.sifra || "N/A",
            vrijemePocetka: pocetak.toLocaleString('hr-HR'), 
            vrijemeZavrsetka: kraj.toLocaleString('hr-HR'),
            sati: radniSati,
            cijenaSataStroja: cijenaSata,
            iznos: (radniSati * cijenaSata).toFixed(2)
          });
        }
      });
      recalculateTotals([...data.Stavka, ...noveStavke]);
      localStorage.setItem('stavka',JSON.stringify(noveStavke))
      return;
    }

    for (let i = 0; i < num; i++) {
      const id = (data[type].length > 0 ? Math.max(...data[type].map(x => x.sifra)) : 0) + i + 1;
      switch (type) {
        case 'Stroj':
          // Generiranje ISO stringa koji uključuje datum i vrijeme
          const ISO_kupnja = faker.date.past({ years: 3 }).toISOString().split('.')[0];
          const ISO_servis = faker.date.future({ years: 1 }).toISOString().split('.')[0];
          
          result.push({ 
            sifra: id, 
            naziv: faker.helpers.arrayElement(rucniAlati), 
            trajanje: faker.number.int({ min: 1000, max: 8000 }) + " h", 
            sati: faker.number.int({ min: 10, max: 500 }), 
            cijena: faker.number.int({ min: 10, max: 300 }), 
            datumKupnje: ISO_kupnja, // Sadrži T vrijeme
            sljedeciServis: ISO_servis, // Sadrži T vrijeme
            aktivan: true 
          });
          break;
        case 'Radnik':
          result.push({ sifra: id, ime: faker.person.firstName(), prezime: faker.person.lastName(), oib: faker.string.numeric(11) });
          break;
        case 'Poduzece':
          result.push({ sifra: id, naziv: faker.company.name(), oib: faker.string.numeric(11) });
          break;
        case 'Gradiliste':
          result.push({ sifra: id, naziv: `Gradilište ${faker.location.city()}`, oib: faker.string.numeric(11) });
          break;
        case 'Nalog':
          result.push({ sifra: id, sifraPoduzeca: getRandomEntity('Poduzece')?.sifra || "N/A", sifraGradilista: getRandomEntity('Gradiliste')?.sifra || "N/A", ukupniIznos: "0.00" });
          break;
      }
    }
    setData(prev => ({ ...prev, [type]: [...prev[type], ...result] }));
    console.log(type)
    console.log(result)

    switch(type){
      case 'Stroj':
        localStorage.setItem('strojevi',JSON.stringify(result))
        break;
      case 'Nalog':
        localStorage.setItem('nalog',JSON.stringify(result))
        break;
      case 'Gradiliste':
        localStorage.setItem('gradilista',JSON.stringify(result))
        break;
      case 'Poduzece':
        localStorage.setItem('poduzece',JSON.stringify(result))
        break;
      case 'Radnik':
        localStorage.setItem('radnici',JSON.stringify(result))
        break;
    }

  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f7f6', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        
        {/* NAVIGACIJA */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '25px', borderBottom: '2px solid #edf2f7', paddingBottom: '15px' }}>
          {Object.keys(data).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 15px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === tab ? '#2563eb' : '#f8fafc', color: activeTab === tab ? 'white' : '#4a5568', fontWeight: 'bold', fontSize: '13px' }}>
              {tab} ({data[tab].length})
            </button>
          ))}
        </div>

        {/* KONTROLE */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', background: '#f8fafc', padding: '15px', borderRadius: '10px', alignItems: 'center' }}>
          {activeTab !== 'Stavka' && <input type="number" value={count} onChange={(e) => setCount(e.target.value)} style={{ width: '60px', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />}
          <button onClick={() => generateData(activeTab)} style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            <Plus size={18} style={{ verticalAlign: 'middle', marginRight: '5px' }} /> 
            {activeTab === 'Stavka' ? 'Popuni naloge stavkama' : `Generiraj ${activeTab}`}
          </button>
          <button onClick={() => setData({...data, [activeTab]: []})} style={{ color: '#e53e3e', background: 'none', border: 'none', cursor: 'pointer', marginLeft: 'auto', fontWeight: 'bold' }}>Isprazni {activeTab}</button>
        </div>

        {/* TABLICA */}
        <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f1f5f9' }}>
                {data[activeTab].length > 0 && Object.keys(data[activeTab][0]).map(key => (
                  <th key={key} style={{ padding: '12px', textAlign: 'left', fontSize: '11px', color: '#64748b', whiteSpace: 'nowrap' }}>{key.toUpperCase()}</th>
                ))}
                <th style={{ padding: '12px', textAlign: 'right', fontSize: '11px', color: '#64748b' }}>BRISANJE</th>
              </tr>
            </thead>
            <tbody>
              {data[activeTab].map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  {Object.values(row).map((val, i) => <td key={i} style={{ padding: '12px', fontSize: '12px', whiteSpace: 'nowrap' }}>{String(val)}</td>)}
                  <td style={{ textAlign: 'right', padding: '12px' }}>
                    <button onClick={() => deleteRow(activeTab === 'Stavka' ? idx : row.sifra, activeTab)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data[activeTab].length === 0 && <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Tablica je prazna.</div>}
        </div>
      </div>
    </div>
  );
};

export default Generator;
