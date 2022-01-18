<script>

const downloadCharacterSheet = () => {

  const node = document.getElementById('id-card');

  html2canvas(node).then(canvas => {
    // document.body.appendChild(canvas)
    // var img    = canvas.toDataURL("image/png");
    // document.write('<img src="'+img+'"/>');
    var link = document.createElement('a');
    link.download = 'filename.png';
    link.href = canvas.toDataURL()
    link.click();
  });

};

const bindInputToElement = (inputEl, elementEl) => {
  inputEl.addEventListener('change', () => {
    elementEl.textContent = inputEl.value;
  });
}

document
  .getElementById('download-button')
  .addEventListener('click', downloadCharacterSheet);

document
  .querySelector('.id-card__subject-id')
  .textContent = md5('something').slice(0, 8);

// Bind name
const nameEl = document.getElementById('name');
bindInputToElement(
  nameEl,
  document.getElementById('id-card-name')
);
nameEl
  .addEventListener('change', () => {
    document
      .querySelector('.id-card__subject-id')
      .textContent = md5(nameEl.value).slice(0, 8);
  });

// Bind date of birth
bindInputToElement(
  document.getElementById('date-of-birth'),
  document.getElementById('id-card-date-of-birth')
);

// Bind gender
bindInputToElement(
  document.getElementById('gender'),
  document.getElementById('id-card-gender')
);

// Bind height
bindInputToElement(
  document.getElementById('height'),
  document.getElementById('id-card-height')
);

// Bind weight
bindInputToElement(
  document.getElementById('weight'),
  document.getElementById('id-card-weight')
);

// Bind mugshot
document
  .getElementById('mugshot')
  .addEventListener('change', function() {
    if ( this.files && this.files[0] ) {
      var FR= new FileReader();
      FR.onload = function(e) {
        var img = document.getElementById('id-card-mugshot');
        img.src = e.target.result;
      };
      FR.readAsDataURL( this.files[0] );
    }
  });
</script>
<template>
  <div id="id-card">
    <div class="id-card material-ui-shadow">

      <!-- \\ mugshot -->
      <div class="id-card__mugshot">
        <img src="http://www.travelcontinuously.com/wp-content/uploads/2018/04/empty-avatar.png" id="id-card-mugshot">
      </div>
      <!-- // mugshot -->

      <!-- \\ foundation logo -->
      <div class="id-card__logo logo">
        <span class="logo__big">BO-SEGNER</span>
        <span class="logo__small">foundation</span>
      </div>
      <!-- // foundation logo -->

      <!-- \\ subject id -->
      <div class="id-card__subject-id">

      </div>
      <!-- // subject id -->

      <!-- \\ experiment banner -->
      <div class="id-card__banner">
        <span class="id-card__banner-text">EXPERIMENT S9.3a</span>
      </div>
      <!-- // experiment banner -->

      <!-- \\ details -->
      <div class="id-card__details">
        <div class="id-card__detail">
          <span class="id-card__detail-label">Name</span>
          <span class="id-card__detail-value" id="id-card-name">Glip-Glop Woodenstein</span>
        </div>
        <div class="id-card__detail">
          <span class="id-card__detail-label">Date of Birth</span>
          <span class="id-card__detail-value" id="id-card-date-of-birth">09/20/1980</span>
        </div>
        <div class="id-card__detail">
          <span class="id-card__detail-label">Issue Date</span>
          <span class="id-card__detail-value">08/01/2018</span>
        </div>
        <div class="id-card__detail">
          <span class="id-card__detail-label">Release Date</span>
          <span class="id-card__detail-value">08/01/2020</span>
        </div>
      </div>
      <!-- // details -->

      <!-- \\ short details -->
      <div class="id-card__details id-card__details--short">
        <div class="id-card__detail">
          <span class="id-card__detail-label">Gender</span>
          <span class="id-card__detail-value" id="id-card-gender">M</span>
        </div>
        <div class="id-card__detail">
          <span class="id-card__detail-label">Height</span>
          <span class="id-card__detail-value" id="id-card-height">6'03"</span>
        </div>
        <div class="id-card__detail">
          <span class="id-card__detail-label">Weight</span>
          <span class="id-card__detail-value" id="id-card-weight">145</span>
        </div>
      </div>
      <!-- // short details -->

    </div>
  </div>

  <div id="id-form">
    <div class="id-form">
      <div class="id-form__row id-form__row--inline">
        <div class="id-form__label">Name</div>
        <div class="id-form__input">
          <input type="text" id="name" placeholder="Name">
        </div>
      </div>
      <div class="id-form__row id-form__row--inline">
        <div class="id-form__label">Date of Birth</div>
        <div class="id-form__input">
          <input type="text" id="date-of-birth" placeholder="Date of Birth">
        </div>
      </div>
      <div></div>
      <div class="id-form__row id-form__row--inline">
        <div class="id-form__label">Gender</div>
        <div class="id-form__input">
          <select id="gender">
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
      </div>
      <div class="id-form__row id-form__row--inline">
        <div class="id-form__label">Height</div>
        <div class="id-form__input">
          <input type="text" id="height" placeholder="Height">
        </div>
      </div>
      <div></div>
      <div class="id-form__row id-form__row--inline">
        <div class="id-form__label">Mugshot</div>
        <div class="id-form__input">
          <input type="file" id="mugshot" accept="image/*">
        </div>
      </div>
      <div class="id-form__row id-form__row--inline">
        <div class="id-form__label">Weight</div>
        <div class="id-form__input">
          <input type="text" id="weight" placeholder="Weight">
        </div>
      </div>
    </div>
  </div>

  <button id="download-button">Download</button>
</template>



<style scoped>
.parent-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  padding-top: 150px;
}

.name-container {
  display: flex;
  flex-direction: column;
  width: 200px;
}

.user-name {
  height: 30px;
  font-size: 20px;
  padding: 5px;
  margin-bottom: 5px;
  text-align: center;
  font-weight: bold;
}

.join-button {
  height: 30px;
  font-size: 20px;
}

.text-input-container {
  height: 100vh;
}

.text-message {
  width: 100%;
  position: absolute;
  bottom: 0px;
  height: 70px;
  padding: 10px;
  box-sizing: border-box;
}
</style>
