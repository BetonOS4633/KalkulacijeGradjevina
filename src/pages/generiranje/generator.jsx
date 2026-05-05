import React, { useState, useMemo, useEffect } from 'react';
import { fakerHR as faker } from '@faker-js/faker';
import { 
  Database, HardHat, Factory, Building2, FileText, 
  ListChecks, Plus, Trash2, Download, Check, X, Edit2 
} from 'lucide-react';

const Generator = () => {
  const [count, setCount] = useState(5);
  const [activeTab, setActiveTab] = useState('Stroj');
  const [data, setData] = useState({
    Stroj: [], Radnik: [], Poduzece: [], Gradiliste: [], Nalog: [], Stavka: []
  });
  const [editState, setEditState] = useState({ index: null, values: {} });

  // --- AUTOMATSKI IZRAČUN ZA STAVKE ---
  useEffect(() => {
    if (activeTab === 'Stavka' && editState.index !== null) {
      const sati = parseFloat(editState.values.sati) || 0;
      const cijenaPoSatu = 50; // Pretpostavljena interna cijena sata
      const noviIznos = (sati * cijenaPoSatu).toFixed(2);
      if (editState.values.iznos !== noviIznos) {
        setEditState(prev => ({ ...prev, values: { ...prev.values, iznos: noviIznos } }));
      }
    }
  }, [editState.values.sati, activeTab]);

  // --- GENERATORI PODATAKA ---
  const generateData = (type) => {
    let result = [];
    const num = parseInt(count) || 1;
    for (let i = 0; i < num; i++) {
      const id = data[type].length + i + 1;
      switch (type) {
        case 'Stroj':
          result.push({ sifra: id, naziv: faker.vehicle.type(), trajanje: 130, cijena: 1250.99, datumPokretanja: '2024-02-21T17:00:00', datumKraja: '2024-03-15T12:00:00', aktivan: true });
          break;
        case 'Radnik':
          result.push({ sifra: id, ime: faker.person.firstName(), prezime: faker.person.lastName(), email: faker.internet.email(), oib: faker.string.numeric(11) });
          break;
        case 'Poduzece':
          result.push({ sifra: id, naziv: faker.company.name() + ' d.o.o.', adresa: faker.location.streetAddress(), mjesto: faker.location.city(), email: faker.internet.email(), telefon: faker.phone.number(), oib: faker.string.numeric(11) });
          break;
        case 'Gradiliste':
          result.push({ sifra: id, naziv: `Projekt ${faker.person.lastName()}`, adresa: faker.location.streetAddress(), mjesto: faker.location.city(), oib: faker.string.numeric(11) });
          break;
        case 'Nalog':
          result.push({ sifra: id, sifraPoduzeca: id, sifraGradilista: id, ukupniIznos: faker.number.int({min: 1000, max: 5000}) });
          break;
        case 'Stavka':
          result.push({ nalog: 1, sifra: id, sifraRadnika: id, sifraStroja: id, vrijemePocetka: '2023-02-01T08:00:00', vrijemeZavrsetka: '2023-02-28T10:30:00', sati: 42.5, iznos: 2000 });
          break;
      }
    }
    setData(prev => ({ ...prev, [type]: [...prev[type], ...result] }));
  };

  const tabs = [
    { id: 'Stroj', label: 'Strojevi', icon: <Database size={18}/> },
    { id: 'Radnik', label: 'Radnici', icon: <HardHat size={18}/> },
    { id: 'Poduzece', label: 'Poduzeća', icon: <Factory size={18}/> },
    { id: 'Gradiliste', label: 'Gradilišta', icon: <Building2 size={18}/> },
    { id: 'Nalog', label: 'Nalozi', icon: <FileText size={18}/> },
    { id: 'Stavka', label: 'Stavke', icon: <ListChecks size={18}/> },
  ];

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        
        {/* VRŠNI IZBORNIK GENERATORA */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '25px', borderBottom: '2px solid #edf2f7', paddingBottom: '15px' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                backgroundColor: activeTab === tab.id ? '#2563eb' : '#f8fafc',
                color: activeTab === tab.id ? 'white' : '#4a5568',
                fontWeight: 'bold', transition: '0.3s'
              }}
            >
              {tab.icon} {tab.label} ({data[tab.id].length})
            </button>
          ))}
        </div>

        {/* KONTROLE */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', background: '#f8fafc', padding: '15px', borderRadius: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <label style={{ fontWeight: 'bold', color: '#4a5568' }}>Broj novih zapisa:</label>
            <input 
              type="number" value={count} onChange={(e) => setCount(e.target.value)} 
              style={{ width: '80px', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
            <button onClick={() => generateData(activeTab)} style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
              <Plus size={18} style={{ verticalAlign: 'middle' }} /> Generiraj {activeTab}
            </button>
          </div>
          <button onClick={() => setData({...data, [activeTab]: []})} style={{ background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer', fontWeight: 'bold' }}>
            <Trash2 size={18} /> Obriši tablicu
          </button>
        </div>

        {/* TABLICA PODATAKA */}
        <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          {data[activeTab].length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f1f5f9' }}>
                  {Object.keys(data[activeTab][0]).map(key => (
                    <th key={key} style={{ padding: '15px', textAlign: 'left', fontSize: '12px', color: '#64748b' }}>{key.toUpperCase()}</th>
                  ))}
                  <th style={{ textAlign: 'right', padding: '15px' }}>AKCIJE</th>
                </tr>
              </thead>
              <tbody>
                {data[activeTab].map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    {Object.keys(row).map(key => (
                      <td key={key} style={{ padding: '15px', fontSize: '14px' }}>
                        {editState.index === idx ? (
                          <input 
                            value={editState.values[key]} 
                            readOnly={key === 'iznos' || key === 'sifra'}
                            onChange={(e) => setEditState({...editState, values: {...editState.values, [key]: e.target.value}})}
                            style={{ width: '100%', padding: '5px', borderRadius: '4px', border: '1px solid #2563eb' }}
                          />
                        ) : String(row[key])}
                      </td>
                    ))}
                    <td style={{ textAlign: 'right', padding: '15px' }}>
                      {editState.index === idx ? (
                        <>
                          <button onClick={() => {
                            const newData = [...data[activeTab]];
                            newData[idx] = editState.values;
                            setData({...data, [activeTab]: newData});
                            setEditState({ index: null, values: {} });
                          }} style={{ color: '#059669', background: 'none', border: 'none', cursor: 'pointer' }}><Check/></button>
                          <button onClick={() => setEditState({ index: null, values: {} })} style={{ color: '#e53e3e', background: 'none', border: 'none', cursor: 'pointer' }}><X/></button>
                        </>
                      ) : (
                        <button onClick={() => setEditState({ index: idx, values: {...row} })} style={{ color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer' }}><Edit2 size={16}/></button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ padding: '50px', textAlign: 'center', color: '#94a3b8' }}>
              Nema generiranih podataka za ovu kategoriju.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Generator;
