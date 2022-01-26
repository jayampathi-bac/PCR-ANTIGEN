<script setup lang="ts">
import { ref } from 'vue'
import { activePanel } from '/@src/state/activePanelState'

type TabId = 'team' | 'projects' | 'schedule'
const activeTab = ref<TabId>('team')
</script>

<template>
  <div
    id="activity-panel"
    :class="[activePanel === 'activity' && 'is-active']"
    class="right-panel-wrapper is-activity"
  >
    <div class="panel-overlay" @click="activePanel = 'none'"></div>

    <div class="right-panel">
      <div class="right-panel-head">
        <h3>Activity</h3>
        <a class="close-panel" @click="activePanel = 'none'">
          <i
            aria-hidden="true"
            class="iconify"
            data-icon="feather:chevron-right"
          ></i>
        </a>
      </div>
      <div class="tabs-wrapper is-triple-slider is-squared">
        <div class="tabs-inner">
          <div class="tabs">
            <ul>
              <li :class="[activeTab === 'team' && 'is-active']">
                <a @click="activeTab = 'team'"><span>Team</span></a>
              </li>
              <li :class="[activeTab === 'projects' && 'is-active']">
                <a @click="activeTab = 'projects'"><span>Projects</span></a>
              </li>
              <li :class="[activeTab === 'schedule' && 'is-active']">
                <a @click="activeTab = 'schedule'"><span>Schedule</span></a>
              </li>
              <li class="tab-naver"></li>
            </ul>
          </div>
        </div>

        <div class="right-panel-body">
          <div
            id="team-side-tab"
            class="tab-content"
            :class="[activeTab === 'team' && 'is-active']"
          >
            <!--Team Member-->
            <div class="team-card">
              <V-Avatar
                picture="https://resource.jvpdtest.com/User.png"
                badge=""
              />

              <div class="meta">
                <span>Joshua S.</span>
                <span>
                  <i
                    aria-hidden="true"
                    class="iconify"
                    data-icon="feather:map-pin"
                  ></i>
                  Las Vegas, NV
                </span>
              </div>
              <a class="link">
                <i
                  aria-hidden="true"
                  class="iconify"
                  data-icon="feather:arrow-right"
                ></i>
              </a>
            </div>

            <!--Team Member-->
            <div class="team-card">
              <V-Avatar
                picture="https://resource.jvpdtest.com/User.png"
                badge=""
              />

              <div class="meta">
                <span>Melany W.</span>
                <span>
                  <i
                    aria-hidden="true"
                    class="iconify"
                    data-icon="feather:map-pin"
                  ></i>
                  San Jose, CA
                </span>
              </div>
              <a class="link">
                <i
                  aria-hidden="true"
                  class="iconify"
                  data-icon="feather:arrow-right"
                ></i>
              </a>
            </div>

            <!--Team Member-->
            <div class="team-card">
              <V-Avatar
                picture="https://resource.jvpdtest.com/User.png"
                badge=""
              />

              <div class="meta">
                <span>Esteban C.</span>
                <span>
                  <i
                    aria-hidden="true"
                    class="iconify"
                    data-icon="feather:map-pin"
                  ></i>
                  Miami, FL
                </span>
              </div>
              <a class="link">
                <i
                  aria-hidden="true"
                  class="iconify"
                  data-icon="feather:arrow-right"
                ></i>
              </a>
            </div>

            <!--Team Member-->
            <div class="team-card">
              <V-Avatar
                picture="https://resource.jvpdtest.com/User.png"
                badge=""
              />

              <div class="meta">
                <span>Tara S.</span>
                <span>
                  <i
                    aria-hidden="true"
                    class="iconify"
                    data-icon="feather:map-pin"
                  ></i>
                  New York, NY
                </span>
              </div>
              <a class="link">
                <i
                  aria-hidden="true"
                  class="iconify"
                  data-icon="feather:arrow-right"
                ></i>
              </a>
            </div>
          </div>

          <div
            id="projects-side-tab"
            class="tab-content"
            :class="[activeTab === 'projects' && 'is-active']"
          >
            <!--Project-->
<!--            <div class="project-card">-->
<!--              <div class="project-inner">-->
<!--                <img-->
<!--                  class="project-avatar"-->
<!--                  src="/images/icons/logos/slicer.svg"-->
<!--                  alt=""-->
<!--                  @error.once="-->
<!--                    $event.target.src = 'https://via.placeholder.com/150x150'-->
<!--                  "-->
<!--                />-->
<!--                <div class="meta">-->
<!--                  <span>The slicer project</span>-->
<!--                  <span>getslicer.io</span>-->
<!--                </div>-->
<!--                <a class="link">-->
<!--                  <i-->
<!--                    aria-hidden="true"-->
<!--                    class="iconify"-->
<!--                    data-icon="feather:arrow-right"-->
<!--                  ></i>-->
<!--                </a>-->
<!--              </div>-->
<!--              <div class="project-foot">-->
<!--                <progress-->
<!--                  class="progress is-primary is-tiny"-->
<!--                  value="31"-->
<!--                  max="100"-->
<!--                >-->
<!--                  31%-->
<!--                </progress>-->
<!--                <div class="foot-stats">-->
<!--                  <span>5 / 24</span>-->

<!--                  <div class="avatar-stack">-->
<!--                    <V-Avatar size="small" picture="https://resource.jvpdtest.com/User.png" />-->
<!--                    <V-Avatar size="small" picture="https://resource.jvpdtest.com/User.png" />-->
<!--                    <V-Avatar size="small" picture="https://resource.jvpdtest.com/User.png" />-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->

            <!--Project-->


            <!--Project-->

          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../../scss/abstracts/_variables.scss';
@import '../../../scss/abstracts/_mixins.scss';
@import '../../../scss/layout/_right-panel.scss';
</style>
