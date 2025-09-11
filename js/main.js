document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const categoryFilter = document.getElementById('category-filter');
  const priceFilter = document.getElementById('price-filter');
  const productCardsContainer = document.getElementById('product-list');
  
  // Verificar que el contenedor existe antes de acceder a sus elementos
  const productCardsData = productCardsContainer ? Array.from(productCardsContainer.querySelectorAll('.product-card')) : [];

  const modal = document.getElementById('product-modal');
  const closeModalBtn = document.getElementById('close-modal');

  const modalName = document.getElementById('modal-title');
  const modalImage = document.getElementById('modal-img-main');
  const modalDescription = document.getElementById('modal-description');
  const modalPrice = document.getElementById('modal-price');
  const modalOptions = document.getElementById('modal-options');
  const modalFragances = document.getElementById('modal-fragances');
  const noResultsMessage = document.getElementById('no-results-message');

  // Funcionalidad de búsqueda y filtro
  const filterProducts = () => {
      // Verificar que los elementos existen antes de usarlos
      const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
      const category = categoryFilter ? categoryFilter.value : 'all';
      const priceOrder = priceFilter ? priceFilter.value : '';

      productCardsData.forEach(card => card.style.display = 'none');
      if (noResultsMessage) {
          noResultsMessage.classList.add('hidden');
      }

      let filteredProducts = productCardsData;

      if (searchTerm) {
          filteredProducts = filteredProducts.filter(card => {
              const title = card.querySelector('h2').textContent.toLowerCase();
              const description = card.querySelector('p').textContent.toLowerCase();
              return title.includes(searchTerm) || description.includes(searchTerm);
          });
      }

      if (category !== 'all') {
          filteredProducts = filteredProducts.filter(card => card.dataset.category === category);
      }

      if (priceOrder === 'low-to-high') {
          filteredProducts.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
      } else if (priceOrder === 'high-to-low') {
          filteredProducts.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
      }

      if (filteredProducts.length > 0) {
          if (productCardsContainer) {
              productCardsContainer.classList.remove('hidden');
          }
          if (noResultsMessage) {
              noResultsMessage.classList.add('hidden');
          }
          filteredProducts.forEach(card => {
              card.style.display = 'block';
          });
      } else {
          if (productCardsContainer) {
              productCardsContainer.classList.add('hidden');
          }
          if (noResultsMessage) {
              noResultsMessage.classList.remove('hidden');
          }
      }
  };

  // Funcionalidad de la ventana modal
  const showModal = (product) => {
      if (!product || !modal) return;
      
      if (modalName) modalName.textContent = product.dataset.name || '';
      if (modalImage) modalImage.src = product.dataset.image || '';
      if (modalDescription) modalDescription.textContent = product.dataset.description || '';

      let options = [];
      try {
          options = product.dataset.options ? JSON.parse(product.dataset.options) : [];
      } catch (e) {
          console.warn('Error parsing product options:', e);
          options = [];
      }
      if (modalOptions) {
          modalOptions.innerHTML = '';
      }
      options.forEach(option => {
          const optionDiv = document.createElement('div');
          optionDiv.innerHTML = `<div class="flex items-center space-x-2"><input type="radio" name="product-option" id="${option.name.replace(/\s/g, '-')}" class="text-sage-green focus:ring-sage-green" checked><label for="${option.name.replace(/\s/g, '-')}" class="text-gray-800">${option.name}</label><span class="ml-auto text-dark-green font-semibold">$${option.price}</span></div>`;
          if (modalOptions) {
              modalOptions.appendChild(optionDiv);
          }
      });
      if (modalPrice && options.length > 0) {
          modalPrice.textContent = `$${options[0].price}`;
      }

      if (modalFragances) {
          modalFragances.innerHTML = '';
      }
      let fragancesData = [];
      try {
          fragancesData = product.dataset.fragances ? JSON.parse(product.dataset.fragances) : [];
      } catch (e) {
          console.warn('Error parsing fragances data:', e);
          fragancesData = [];
      }
      if (fragancesData.length > 0) {
          const fragancesTitle = document.createElement('h3');
          fragancesTitle.classList.add('font-semibold', 'mb-2');
          fragancesTitle.textContent = "Selecciona tu fragancia:";
          modalFragances.appendChild(fragancesTitle);

          const fragancesContainer = document.createElement('div');
          fragancesContainer.classList.add('flex', 'flex-wrap', 'gap-2');
          fragancesData.forEach((fragance, index) => {
              const fraganceRadio = document.createElement('input');
              fraganceRadio.type = 'radio';
              fraganceRadio.name = 'product-fragance';
              fraganceRadio.id = `fragance-${fragance.replace(/\s/g, '-')}`;
              fraganceRadio.classList.add('hidden', 'peer');
              if (index === 0) fraganceRadio.checked = true;

              const fraganceLabel = document.createElement('label');
              fraganceLabel.setAttribute('for', `fragance-${fragance.replace(/\s/g, '-')}`);
              fraganceLabel.classList.add('px-4', 'py-2', 'bg-white', 'text-dark-green', 'rounded-full', 'border', 'border-gray-300', 'cursor-pointer', 'peer-checked:bg-sage-green', 'peer-checked:text-white', 'peer-checked:border-sage-green', 'transition-colors', 'duration-200');
              fraganceLabel.textContent = fragance;
              fragancesContainer.appendChild(fraganceRadio);
              fragancesContainer.appendChild(fraganceLabel);
          });
          modalFragances.appendChild(fragancesContainer);
      } else {
          modalFragances.innerHTML = '';
      }

      if (modal) {
          modal.classList.remove('hidden');
      }
  };

  // Delegación de eventos para los botones "Ver detalles"
  document.body.addEventListener('click', (e) => {
      if (e.target.classList.contains('open-modal')) {
          const productCard = e.target.closest('.product-card');
          if (productCard) {
              showModal(productCard);
          }
      }
  });

  // Verificar que el botón de cerrar modal existe antes de agregar el event listener
  if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
          if (modal) {
              modal.classList.add('hidden');
          }
      });
  }

  // Event listeners para filtros y búsqueda - verificar que existen
  if (searchInput) {
      searchInput.addEventListener('input', filterProducts);
  }
  if (categoryFilter) {
      categoryFilter.addEventListener('change', filterProducts);
  }
  if (priceFilter) {
      priceFilter.addEventListener('change', filterProducts);
  }

  // Llamada inicial para mostrar todos los productos al cargar
  filterProducts();
});

// Lógica para los modales de imagen
function openImage(src) {
  const imageModal = document.getElementById("image-modal");
  const imageModalImg = document.getElementById("image-modal-img");
  imageModal.classList.remove("hidden");
  imageModalImg.src = src;
}
function closeImage() {
  document.getElementById("image-modal").classList.add("hidden");
}

// Lógica del menú móvil manejada por mobile-menu.js