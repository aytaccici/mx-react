import { create } from 'zustand';

interface DomainStore {
  domains: string[];
  addDomain: (domain: string) => void;
  removeDomain: (domain: string) => void;
  clearDomains: () => void;
}

export const useDomainStore = create<DomainStore>((set) => ({
  domains: [],
  addDomain: (domain) => set((state) => {
    if (!state.domains.includes(domain)) {
      return { domains: [...state.domains, domain] };
    }
    return state;
  }),
  removeDomain: (domain) => set((state) => ({
    domains: state.domains.filter((d) => d !== domain),
  })),
  clearDomains: () => set({ domains: [] }),
})); 