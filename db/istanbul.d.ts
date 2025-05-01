declare module '../../db/istanbul.json' {
  interface Company {
    id: string;
    ADRES: string;
    EPOSTA1: string;
    FAALIYET: string;
    FAKS1_TUM: string;
    ILCE_KODU: string;
    ILCE_TANIMI: string;
    IL_KODU: string;
    IL_TANIMI: string;
    ISCI_SAYISI: string;
    NACE: string;
    NACE_KODU_TANIMI: string;
    POSTA_KODU: string;
    SEKTOR: string;
    TELEFON1_TUM: string;
    TIC_SCL_NO: string;
    ULKE_TANIMI: string;
    UNVAN: string;
    WEB_ADRES: string;
    TES_SERMAYE: string;
    MUSTERI_ID: string;
    TES_SERMAYE_FORMATLI: string;
    EntityIlkHali: string;
  }

  const data: Company[];
  export default data;
} 