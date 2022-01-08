<template>
  <div id="id-card">
    <div class="id-card material-ui-shadow">

      <!-- \\ mugshot -->
      <div class="id-card__mugshot">
        <img src="https://www.travelcontinuously.com/wp-content/uploads/2018/04/empty-avatar.png" id="id-card-mugshot">
      </div>
      <!-- // mugshot -->

      <!-- \\ foundation logo -->
      <div class="id-card__logo logo">
        <!--       <span class="logo__big">BO-SEGNER</span> -->
        <span class="logo__small">Test Result Certificate</span>
      </div>
      <!-- // foundation logo -->

      <!-- \\ subject id -->

      <!-- // subject id -->

      <!-- \\ experiment banner -->
      <div class="id-card__banner">


        <img src="https://www.travelcontinuously.com/wp-content/uploads/2018/04/empty-avatar.png" id="id-mugshot">


        <!--       <span class="id-card__banner-text">EXPERIMENT S9.3a</span> -->
      </div>
      <!-- // experiment banner -->

      <!-- \\ details -->
      <div class="id-card__details">
        <div class="id-card__detail">
          <span class="id-card__detail-label">Contact Number</span>
          <span class="id-card__detail-value" id="id-card-name">{{formData.contact_number}}</span>
        </div>
        <div class="id-card__detail">
          <span class="id-card__detail-label">Email</span>
          <span class="id-card__detail-value" id="id-card-date-of-birth">{{formData.email}}</span>
        </div>
        <div class="id-card__detail">
          <span class="id-card__detail-label">Result</span>
          <span class="id-card__detail-value">{{(formData.result === 1) ? "Positive" : "Negative"}}</span>
        </div>
        <div class="id-card__detail">
          <span class="id-card__detail-label">Date</span>
          <span class="id-card__detail-value">{{formData.contact_number}}</span>
        </div>
        <div style="margin-top: 5%">
          <span class="id-card__detail-label">Validity</span>
          <p>yy/mm/dd/hh/mm to yy/mm/dd/hh/mm</p>
        </div>
      </div>
      <!-- // details -->

      <!-- \\ short details -->

      <!-- // short details -->

    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";

const store = useStore()
export default {
  props: {
    formData: Object
  },

  name: "IDCardGenerator",

  methods: {
    downloadCharacterSheet() {
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
    },

    bindInputToElement(inputEl, elementEl) {
      inputEl.addEventListener('change', () => {
        elementEl.textContent = inputEl.value;
      });
      this.function1();
    },

    function1() {
      document.getElementById('download-button').addEventListener('click', downloadCharacterSheet);
      document.querySelector('.id-card__subject-id').textContent = md5('something').slice(0, 8);

      // Bind name
      const nameEl = document.getElementById('name');
      bindInputToElement(nameEl, document.getElementById('id-card-name'));

      nameEl.addEventListener('change', () => {
        document.querySelector('.id-card__subject-id').textContent = md5(nameEl.value).slice(0, 8);
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
      document.getElementById('mugshot').addEventListener('change', function () {
        if (this.files && this.files[0]) {
          var FR = new FileReader();
          FR.onload = function (e) {
            var img = document.getElementById('id-card-mugshot');
            img.src = e.target.result;
          };
          FR.readAsDataURL(this.files[0]);
        }
      });
    },
  }


}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=PT+Sans:400,700');
@import url('https://fonts.googleapis.com/css?family=PT+Sans:400,700');

body {
  background: #e2e1e0;
  margin: 0 auto;
  padding: 12vmin 10vmin;
  max-width: 50em;
  line-height: 1.5em;
  font-family: 'PT Sans';
  word-wrap: break-word;
}

#id-card {
  display: inline-block;
  float: left;
  margin-right: 2em;
}

#id-mugshot{
  width: 100%;
  height: 50pt;
}

.id-card {
  width: 336px;
  height: 192px;
  background: #ffffff;
  padding: 10px;
  position: relative;

  &__mugshot {
    position: absolute;
    right: 10px;
    bottom:1%;
    width: 100px;
    height: 100px;
    background: #ffffff;

    img {
      width: 100px;
      height: 100px;
    }
  }

  &__mugshot-2 {
    position: absolute;
    right: 10px;
    margin-top: 10%;
    width: 100px;
    height: 50pt;
    background: #ffffff;

    img {
      width: 100px;
      height: 90px;
    }
  }

  &__logo {
    width: 230px;
  }


  &__banner {
    height: 50pt;
    background: white;
    margin-top: 1%;
    margin-left: -10px;
    padding-left: 12px;
  }


  &__details {
    padding-top: 2%;
    font-size: 6pt;
    line-height: 1.5;
    text-transform: uppercase;
    width: 60%;
    display: inline-block;

    &--short {
      float: right;
      margin-left: 30px;
      width: 100px;
    }
  }

  &__detail {
    height: 10px;
    padding-top: 3px;
    padding-bottom: 4px;
    & + & {
      border-top: 1px solid #eeee;
    }
  }

  &__detail-label {
    color: #333;
    font-weight: bold;

    &:after {
      content: ' • ';
      font-weight: normal;
    }
  }
}

.logo {

  &__small {
    font-size: 10pt;
    letter-spacing: 3px;
    position: relative;
    top: -10px;
    text-align: center;

  }
}


.id-form {

  &__row {
    padding-bottom: 8px;

    &--inline {
      width: 10em;
      padding-right: 1em;
      padding-bottom: 1em;
      display: inline-block;
    }
  }

  &__label {
    font-size: 8pt;
    line-height: 8pt;
  }

  &__input {
  }
}

.material-ui-shadow {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

.material-ui-shadow:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
</style>
