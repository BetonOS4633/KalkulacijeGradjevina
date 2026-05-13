
// import React, { useState, useEffect } from 'react';
// import { fakerHR as faker } from '@faker-js/faker';
// import { Plus, Trash2, AlertTriangle } from 'lucide-react';

// const generateValidOib = () => {
//   let digits = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10));
//   let a = 10;
//   for (let d of digits) {
//     a = (a + d) % 10;
//     if (a === 0) a = 10;
//     a = (a * 2) % 11;
//   }
//   let kontrolna = 11 - a;
//   if (kontrolna === 10) kontrolna = 0;
//   return digits.join('') + kontrolna;
// };

// const Generator = () => {
//   const [count, setCount] = useState(5);
//   const [activeTab, setActiveTab] = useState('Stroj');
//   const [data, setData] = useState({
//     Stroj: [], Radnik: [], Poduzece: [], Gradiliste: [], Nalog: [], Stavka: []
//   });

//   const rucniAlati = ["Udarna bušilica", "Ubodna pila", "Stroj za rezanje betona", "Kutna brusilica", "Rotacijski čekić", "Industrijski usisavač"];

//   // Funkcija za potpuno brisanje svega
//   const resetAll = () => {
//     if (window.confirm("Jeste li sigurni da želite obrisati APSOLUTNO SVE podatke iz svih tablica i memorije?")) {
//       const emptyState = { Stroj: [], Radnik: [], Poduzece: [], Gradiliste: [], Nalog: [], Stavka: [] };
//       setData(emptyState);
//       localStorage.clear();
//       alert("Svi podaci su obrisani.");
//     }
//   };

//   const getRandomEntity = (type) => {
//     const table = data[type];
//     return table.length > 0 ? table[Math.floor(Math.random() * table.length)] : null;
//   };

//   const recalculateTotals = (currentStavke) => {
//     const noviNalozi = data.Nalog.map(nalog => {
//       const suma = currentStavke
//         .filter(s => s.nalog === nalog.sifra)
//         .reduce((acc, curr) => acc + parseFloat(curr.iznos), 0);
//       return { ...nalog, ukupniIznos: suma.toFixed(2) };
//     });
    
//     setData(prev => ({ ...prev, Stavka: currentStavke, Nalog: noviNalozi }));
//     localStorage.setItem('nalog', JSON.stringify(noviNalozi));
//     localStorage.setItem('stavka', JSON.stringify(currentStavke));
//   };

//   const deleteRow = (id, type) => {
//     if (type === 'Nalog') {
//       const noveStavke = data.Stavka.filter(s => s.nalog !== id);
//       const noviNalozi = data.Nalog.filter(n => n.sifra !== id);
//       setData(prev => ({ ...prev, Nalog: noviNalozi, Stavka: noveStavke }));
//     } else if (type === 'Stavka') {
//       const noveStavke = [...data.Stavka];
//       noveStavke.splice(id, 1);
//       recalculateTotals(noveStavke);
//     } else {
//       setData(prev => ({ ...prev, [type]: prev[type].filter(item => item.sifra !== id) }));
//     }
//   };

//   const generateData = (type) => {
//     const num = parseInt(count) || 1;
//     let result = [];

//     if (type === 'Stavka') {
//       if (data.Nalog.length === 0) return alert("Prvo izgeneriraj Nalog!");
//       if (data.Radnik.length === 0 || data.Stroj.length === 0) return alert("Nedostaju Radnici ili Strojevi!");

//       let azuriraneStavke = [...data.Stavka];
//       data.Nalog.forEach(nalog => {
//         const postojeceStavkeNaloga = azuriraneStavke.filter(s => s.nalog === nalog.sifra);
//         let sljedeciRedniBroj = postojeceStavkeNaloga.length > 0 
//           ? Math.max(...postojeceStavkeNaloga.map(s => s.sifra)) + 1 
//           : 1;

//         for (let i = 0; i < num; i++) {
//           const randomStroj = getRandomEntity('Stroj');
//           const pocetak = faker.date.between({ from: '2024-01-01T07:00:00', to: '2024-12-31T12:00:00' });
//           const radniSati = faker.number.int({ min: 1, max: 10 });
//           const kraj = new Date(pocetak.getTime() + radniSati * 60 * 60 * 1000);
//           const cijenaSata = randomStroj ? randomStroj.cijena : 0;

//           azuriraneStavke.push({
//             nalog: nalog.sifra,
//             sifra: sljedeciRedniBroj++,
//             sifraRadnika: getRandomEntity('Radnik')?.sifra || "N/A",
//             sifraStroja: randomStroj?.sifra || "N/A",
//             vrijemePocetka: pocetak.toLocaleString('hr-HR'),
//             vrijemeZavrsetka: kraj.toLocaleString('hr-HR'),
//             sati: radniSati,
//             iznos: (radniSati * cijenaSata).toFixed(2)
//           });
//         }
//       });
//       recalculateTotals(azuriraneStavke);
//       return;
//     }

//     for (let i = 0; i < num; i++) {
//       const id = (data[type].length > 0 ? Math.max(...data[type].map(x => x.sifra)) : 0) + i + 1;
//       switch (type) {
//         case 'Stroj':
//           result.push({ 
//             sifra: id, naziv: faker.helpers.arrayElement(rucniAlati), 
//             trajanje: faker.number.int({ min: 1000, max: 8000 }) + " h", 
//             sati: faker.number.int({ min: 10, max: 500 }), 
//             cijena: faker.number.int({ min: 10, max: 300 }), 
//             datumPokretanja: faker.date.past().toISOString().split('T')[0], 
//             datumKraja: faker.date.future().toISOString().split('T')[0], 
//             aktivan: true 
//           });
//           break;
//         case 'Radnik':
//           result.push({ sifra: id, ime: faker.person.firstName(), prezime: faker.person.lastName(), email: faker.internet.email(), oib: generateValidOib() });
//           break;
//         case 'Poduzece':
//           result.push({ sifra: id, naziv: faker.company.name(), adresa: faker.location.streetAddress(), mjesto: faker.location.city(), email: faker.internet.email(), telefon: faker.phone.number(), oib: generateValidOib() });
//           break;
//         case 'Gradiliste':
//           result.push({ sifra: id, naziv: `Gradilište ${faker.location.city()}`, adresa: faker.location.streetAddress(), mjesto: faker.location.city(), email: faker.internet.email(), oib: generateValidOib() });
//           break;
//         case 'Nalog':
//           result.push({ sifra: id, sifraPoduzeca: getRandomEntity('Poduzece')?.sifra || "N/A", sifraGradilista: getRandomEntity('Gradiliste')?.sifra || "N/A", ukupniIznos: "0.00" });
//           break;
//       }
//     }

//     const updatedTable = [...data[type], ...result];
//     setData(prev => ({ ...prev, [type]: updatedTable }));
//     const storageKeys = { Stroj: 'strojevi', Nalog: 'nalog', Gradiliste: 'gradilista', Poduzece: 'poduzeca', Radnik: 'radnici' };
//     if (storageKeys[type]) localStorage.setItem(storageKeys[type], JSON.stringify(updatedTable));
//   };

//   return (
//     <div style={{ padding: '20px', backgroundColor: '#f4f7f6', minHeight: '100vh', fontFamily: 'sans-serif' }}>
//       <div style={{ maxWidth: '1400px', margin: '0 auto', background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        
//         {/* NAVIGACIJA */}
//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '25px', borderBottom: '2px solid #edf2f7', paddingBottom: '15px' }}>
//           {Object.keys(data).map(tab => (
//             <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 15px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === tab ? '#2563eb' : '#f8fafc', color: activeTab === tab ? 'white' : '#4a5568', fontWeight: 'bold', fontSize: '13px' }}>
//               {tab} ({data[tab].length})
//             </button>
//           ))}
//         </div>

//         {/* KONTROLE */}
//         <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', background: '#f8fafc', padding: '15px', borderRadius: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//             <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Količina:</span>
//             <input type="number" value={count} onChange={(e) => setCount(e.target.value)} style={{ width: '60px', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
//           </div>
          
//           <button onClick={() => generateData(activeTab)} style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
//             <Plus size={18} style={{ verticalAlign: 'middle', marginRight: '5px' }} /> 
//             {activeTab === 'Stavka' ? `Dodaj na SVAKI nalog po ${count} stavki` : `Generiraj ${activeTab}`}
//           </button>

//           <button onClick={() => setData({...data, [activeTab]: []})} style={{ color: '#e53e3e', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>
//             Isprazni samo {activeTab}
//           </button>

//           <button onClick={resetAll} style={{ marginLeft: 'auto', backgroundColor: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca', padding: '10px 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
//             <AlertTriangle size={16} /> OBRIŠI SVE PODATKE
//           </button>
//         </div>

//         {/* TABLICA */}
//         <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
//           <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//             <thead>
//               <tr style={{ background: '#f1f5f9' }}>
//                 {data[activeTab].length > 0 && Object.keys(data[activeTab][0]).map(key => (
//                   <th key={key} style={{ padding: '12px', textAlign: 'left', fontSize: '11px', color: '#64748b', whiteSpace: 'nowrap' }}>{key.toUpperCase()}</th>
//                 ))}
//                 <th style={{ padding: '12px', textAlign: 'right', fontSize: '11px', color: '#64748b' }}>BRISANJE</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data[activeTab].map((row, idx) => (
//                 <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
//                   {Object.values(row).map((val, i) => <td key={i} style={{ padding: '12px', fontSize: '12px', whiteSpace: 'nowrap' }}>{String(val)}</td>)}
//                   <td style={{ textAlign: 'right', padding: '12px' }}>
//                     <button onClick={() => deleteRow(activeTab === 'Stavka' ? idx : row.sifra, activeTab)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={14} /></button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {data[activeTab].length === 0 && <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Tablica je prazna.</div>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Generator;



import React, { useState, useEffect } from 'react';
import { fakerHR as faker } from '@faker-js/faker';
import { Plus, Trash2, AlertTriangle } from 'lucide-react';

const generateValidOib = () => {
  let digits = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10));
  let a = 10;
  for (let d of digits) {
    a = (a + d) % 10;
    if (a === 0) a = 10;
    a = (a * 2) % 11;
  }
  let kontrolna = 11 - a;
  if (kontrolna === 10) kontrolna = 0;
  return digits.join('') + kontrolna;
};

const Generator = () => {
  const [count, setCount] = useState(5);
  const [activeTab, setActiveTab] = useState('Stroj');
  const [data, setData] = useState({
    Stroj: [], Radnik: [], Poduzece: [], Gradiliste: [], Nalog: [], Stavka: []
  });

  const rucniAlati = ["Udarna bušilica", "Ubodna pila", "Stroj za rezanje betona", "Kutna brusilica", "Rotacijski čekić", "Industrijski usisavač"];

  const resetAll = () => {
    if (window.confirm("Jeste li sigurni da želite obrisati APSOLUTNO SVE podatke iz svih tablica i memorije?")) {
      const emptyState = { Stroj: [], Radnik: [], Poduzece: [], Gradiliste: [], Nalog: [], Stavka: [] };
      setData(emptyState);
      localStorage.clear();
      alert("Svi podaci su obrisani.");
    }
  };

  const getRandomEntity = (type) => {
    const table = data[type];
    return table.length > 0 ? table[Math.floor(Math.random() * table.length)] : null;
  };

  const recalculateTotals = (currentStavke) => {
    const noviNalozi = data.Nalog.map(nalog => {
      const suma = currentStavke
        .filter(s => s.nalog === nalog.sifra)
        .reduce((acc, curr) => acc + parseFloat(curr.iznos), 0);
      return { ...nalog, ukupniIznos: parseFloat(suma.toFixed(2)) };
    });
    
    setData(prev => ({ ...prev, Stavka: currentStavke, Nalog: noviNalozi }));
    localStorage.setItem('nalog', JSON.stringify(noviNalozi));
    localStorage.setItem('stavka', JSON.stringify(currentStavke));
  };

  const deleteRow = (id, type) => {
    if (type === 'Nalog') {
      const noveStavke = data.Stavka.filter(s => s.nalog !== id);
      const noviNalozi = data.Nalog.filter(n => n.sifra !== id);
      setData(prev => ({ ...prev, Nalog: noviNalozi, Stavka: noveStavke }));
    } else if (type === 'Stavka') {
      const noveStavke = [...data.Stavka];
      noveStavke.splice(id, 1);
      recalculateTotals(noveStavke);
    } else {
      setData(prev => ({ ...prev, [type]: prev[type].filter(item => item.sifra !== id) }));
    }
  };

  const generateData = (type) => {
    const num = parseInt(count) || 1;
    let result = [];

    if (type === 'Stavka') {
      if (data.Nalog.length === 0) return alert("Prvo izgeneriraj Nalog!");
      if (data.Radnik.length === 0 || data.Stroj.length === 0) return alert("Nedostaju Radnici ili Strojevi!");

      let azuriraneStavke = [...data.Stavka];
      
      data.Nalog.forEach(nalog => {
        const postojeceStavkeNaloga = azuriraneStavke.filter(s => s.nalog === nalog.sifra);
        let sljedeciRedniBroj = postojeceStavkeNaloga.length > 0 
          ? Math.max(...postojeceStavkeNaloga.map(s => s.sifra)) + 1 
          : 1;

        // NOVO: Random od 1 do 10 stavki za svaki nalog
        const randomBrojStavki = Math.floor(Math.random() * 10) + 1;

        for (let i = 0; i < randomBrojStavki; i++) {
          const randomStroj = getRandomEntity('Stroj');
          const pocetak = faker.date.between({ from: '2024-01-01T07:00:00', to: '2024-12-31T12:00:00' });
          const radniSati = faker.number.int({ min: 1, max: 10 });
          const kraj = new Date(pocetak.getTime() + radniSati * 60 * 60 * 1000);
          const cijenaSata = randomStroj ? randomStroj.cijena : 0;

        
          azuriraneStavke.push({
            nalog: nalog.sifra,
            sifra: sljedeciRedniBroj++,
            sifraRadnika: getRandomEntity('Radnik')?.sifra || "N/A",
            sifraStroja: randomStroj?.sifra || "N/A",
            vrijemePocetka: pocetak,
            vrijemeZavrsetka: kraj,
            sati: radniSati,
            iznos: (radniSati * cijenaSata).toFixed(2)
          });
        }
      });
      recalculateTotals(azuriraneStavke);
      return;
    }

    for (let i = 0; i < num; i++) {
      const id = (data[type].length > 0 ? Math.max(...data[type].map(x => x.sifra)) : 0) + i + 1;
      switch (type) {
        case 'Stroj':
          result.push({ 
            sifra: id, naziv: faker.helpers.arrayElement(rucniAlati), 
            trajanje: faker.number.int({ min: 1000, max: 8000 }) + " h", 
            sati: faker.number.int({ min: 10, max: 500 }), 
            cijena: faker.number.int({ min: 10, max: 300 }), 
            datumPokretanja: faker.date.past().toISOString().split('T')[0], 
            datumKraja: faker.date.future().toISOString().split('T')[0], 
            aktivan: true 
          });
          break;
        case 'Radnik':
          result.push({ sifra: id, ime: faker.person.firstName(), prezime: faker.person.lastName(), email: faker.internet.email(), oib: generateValidOib() });
          break;
        case 'Poduzece':
          result.push({ sifra: id, naziv: faker.company.name(), adresa: faker.location.streetAddress(), mjesto: faker.location.city(), email: faker.internet.email(), telefon: faker.phone.number(), oib: generateValidOib() });
          break;
        case 'Gradiliste':
          result.push({ sifra: id, naziv: `Gradilište ${faker.location.city()}`, adresa: faker.location.streetAddress(), mjesto: faker.location.city(), email: faker.internet.email(), oib: generateValidOib() });
          break;
        case 'Nalog':
          result.push({ sifra: id, sifraPoduzeca: getRandomEntity('Poduzece')?.sifra || "N/A", sifraGradilista: getRandomEntity('Gradiliste')?.sifra || "N/A", ukupniIznos: 0 });
          break;
      }
    }

    const updatedTable = [...data[type], ...result];
    setData(prev => ({ ...prev, [type]: updatedTable }));
    const storageKeys = { Stroj: 'strojevi', Nalog: 'nalog', Gradiliste: 'gradilista', Poduzece: 'poduzeca', Radnik: 'radnici' };
    if (storageKeys[type]) localStorage.setItem(storageKeys[type], JSON.stringify(updatedTable));
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
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', background: '#f8fafc', padding: '15px', borderRadius: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Količina:</span>
            <input type="number" value={count} onChange={(e) => setCount(e.target.value)} style={{ width: '60px', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>
          
          <button onClick={() => generateData(activeTab)} style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            <Plus size={18} style={{ verticalAlign: 'middle', marginRight: '5px' }} /> 
            {activeTab === 'Stavka' ? `Dodaj nasumično (1-10) stavki na Nalog` : `Generiraj ${activeTab}`}
          </button>

          <button onClick={() => setData({...data, [activeTab]: []})} style={{ color: '#e53e3e', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>
            Isprazni samo {activeTab}
          </button>

          <button onClick={resetAll} style={{ marginLeft: 'auto', backgroundColor: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca', padding: '10px 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <AlertTriangle size={16} /> OBRIŠI SVE PODATKE
          </button>
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
