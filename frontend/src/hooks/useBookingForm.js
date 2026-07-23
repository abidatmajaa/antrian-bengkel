import { useReducer, useMemo, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { categories } from '../components/estimasi/EstimasiData';

const initialState = {
  step: 0,
  form: { name: '', phone: '', motorBrand: '', motorType: '', year: '', plate: '', notes: '' },
  selectedServices: [],
  selectedDate: null,
  submitted: false,
};

function bookingReducer(state, action) {
  switch (action.type) {
    case 'NEXT_STEP':
      return { ...state, step: state.step + 1 };
    case 'PREV_STEP':
      return { ...state, step: state.step - 1 };
    case 'UPDATE_FORM':
      return {
        ...state,
        form: { ...state.form, [action.payload.name]: action.payload.value },
      };
    case 'TOGGLE_SERVICE':
      const id = action.payload;
      return {
        ...state,
        selectedServices: state.selectedServices.includes(id)
          ? state.selectedServices.filter((s) => s !== id)
          : [...state.selectedServices, id],
      };
    case 'SET_DATE':
      return { ...state, selectedDate: action.payload };
    case 'SUBMIT':
      return { ...state, submitted: true };
    case 'SET_NAME':
      return { ...state, form: { ...state.form, name: action.payload } };
    default:
      return state;
  }
}

export function useBookingForm() {
  const [state, dispatch] = useReducer(bookingReducer, initialState);
  const { user } = useAuth();

  // Isi nama otomatis dari akun login, tidak bisa diubah user
  useEffect(() => {
    if (user?.name) {
      dispatch({ type: 'SET_NAME', payload: user.name });
    }
  }, [user?.name]);

  // Kalkulasi estimasi harga berdasarkan item yang dipilih
  const { minPrice, maxPrice } = useMemo(() => {
    let min = 0;
    let max = 0;
    
    // Looping semua kategori dan itemnya
    categories.forEach(cat => {
      cat.items.forEach(item => {
        if (state.selectedServices.includes(item.id)) {
          min += item.min;
          max += item.max;
        }
      });
    });

    return { minPrice: min, maxPrice: max };
  }, [state.selectedServices]);

  const handleNextStep = () => dispatch({ type: 'NEXT_STEP' });
  const handlePrevStep = () => dispatch({ type: 'PREV_STEP' });
  
  const handleFormChange = (e) => {
    dispatch({ type: 'UPDATE_FORM', payload: { name: e.target.name, value: e.target.value } });
  };

  const toggleService = (id) => {
    dispatch({ type: 'TOGGLE_SERVICE', payload: id });
  };

  const setDate = (date) => {
    dispatch({ type: 'SET_DATE', payload: date });
  };

  const submitForm = () => {
    dispatch({ type: 'SUBMIT' });
  };

  return {
    state,
    minPrice,
    maxPrice,
    handleNextStep,
    handlePrevStep,
    handleFormChange,
    toggleService,
    setDate,
    submitForm,
  };
}
