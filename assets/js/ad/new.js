import axios from 'axios';
import _ from 'lodash';

document.addEventListener('DOMContentLoaded', () => {
  /**
   * TODO: Affichage des champs spécifiques selon la catégorie choisie
   * @type {HTMLElement}
   */
  const categoriesSelect = document.getElementById('categories');
  categoriesSelect.addEventListener('change', () => {
    console.log(categoriesSelect.value);
  });

  /**
   * Affichage des villes par départements
   * @type {HTMLElement}
   */
  const departmentsSelect = document.getElementById('departments');
  const citiesSelect = document.getElementById('cities');

  departmentsSelect.addEventListener('change', () => getCitiesByDepartments(), false);

  function getCitiesByDepartments() {
    citiesSelect.disabled = true;
    clearSelect();
    axios.get(`/ad/get-cities?department=${departmentsSelect.value}`)
      .then((response) => {
        _.chain(response.data)
          .sortBy(['zip_code', 'name'])
          .map((data) => {
            const opt = document.createElement('option');
            opt.value = data._id;
            opt.innerHTML = `${data.zip_code} - ${data.name}`;
            citiesSelect.appendChild(opt);

            return true;
          })
          .value();
        citiesSelect.disabled = false;
      })
      .catch(e => new Error(e));
  }

  /**
   * Réinitialisation du select
   */
  function clearSelect() {
    citiesSelect.innerHTML = '';
    citiesSelect.innerHTML = '<option disabled selected>Villes</option>';
  }

  /**
   * Prévisualisation des images a uploader
   * @type {HTMLElement}
   */
  const photoUpload0Input = document.getElementById('picture0');
  const photoUpload1Input = document.getElementById('picture1');
  const photoUpload2Input = document.getElementById('picture2');

  photoUpload0Input.addEventListener('change', () => readURL(photoUpload0Input), false);
  photoUpload1Input.addEventListener('change', () => readURL(photoUpload1Input), false);
  photoUpload2Input.addEventListener('change', () => readURL(photoUpload2Input), false);

  function readURL(input) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const parent = input.parentNode;
        parent.innerHTML = '';
        const image = document.createElement('img');
        image.setAttribute('src', e.target.result);

        parent.appendChild(image);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  /**
   * Affichage des infos du champ selectionné
   * @type {HTMLElement}
   */

  const titleInput = document.getElementById('title');
  const descriptionInput = document.getElementById('description');
  const uevInput = document.getElementById('uev');

  titleInput.addEventListener('focusin', () => {
    const element = document.querySelector('[data-for="title"]');
    element.classList.add('active');
  });

  titleInput.addEventListener('focusout', () => {
    const element = document.querySelector('[data-for="title"]');

    element.classList.remove('active');
  });

  descriptionInput.addEventListener('focusin', () => {
    const element = document.querySelector('[data-for="description"]');
    element.classList.add('active');
  });

  descriptionInput.addEventListener('focusout', () => {
    const element = document.querySelector('[data-for="description"]');

    element.classList.remove('active');
  });

  uevInput.addEventListener('focusin', () => {
    const element = document.querySelector('[data-for="uev"]');
    element.classList.add('active');
  });

  uevInput.addEventListener('focusout', () => {
    const element = document.querySelector('[data-for="uev"]');

    element.classList.remove('active');
  });
});
