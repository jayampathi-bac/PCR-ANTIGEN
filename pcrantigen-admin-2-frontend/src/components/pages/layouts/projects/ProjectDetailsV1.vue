<script setup lang="ts">
import type { PropType } from 'vue'
import { defineProps, ref } from 'vue'
import { activePanel } from '/@src/state/activePanelState'

const filterTasks = ref(0)

const participants = [
  { picture: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png' },
  { picture: '/demo/avatars/9.jpg' },
  { picture: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png' },
  { picture: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png' },
  { picture: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png' },
  { picture: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png' },
  { picture: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png' },
]

const props = defineProps({
  activeTab: {
    type: String as PropType<'project' | 'content' | 'brands'>,
    default: 'project',
  },
})
</script>

<template>
  <div class="project-details">
    <div class="tabs-wrapper is-triple-slider">
      <div class="tabs-inner">
        <div class="tabs">
          <ul>
            <li :class="[activeTab === 'project' && 'is-active']">
              <a @click="activeTab = 'project'"><span>Project</span></a>
            </li>
            <li :class="[activeTab === 'team' && 'is-active']">
              <a @click="activeTab = 'team'"><span>Team</span></a>
            </li>
            <li :class="[activeTab === 'tasks' && 'is-active']">
              <a @click="activeTab = 'tasks'"><span>Tasks</span></a>
            </li>
            <li class="tab-naver"></li>
          </ul>
        </div>
      </div>

      <div
        id="project-tab"
        class="tab-content"
        :class="[activeTab === 'project' && 'is-active']"
      >
        <div class="columns project-details-inner">
          <div class="column is-8">
            <div class="project-details-card">
              <div class="card-head">
                <div class="title-wrap">
                  <h3>Brand and Website Redesign</h3>
                  <p>UI/UX Design</p>
                </div>

                <V-IconButton
                  size="small"
                  icon="feather:edit-3"
                  @click="activePanel = 'task'"
                />
              </div>

              <div class="project-overview">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quid
                  iudicant sensus? Primum quid tu dicis breve? Etiam
                  beatissimum? Ne discipulum abducam, times.
                </p>
                <V-AvatarStack :avatars="participants" />
              </div>

              <div class="project-features">
                <div class="project-feature">
                  <i aria-hidden="true" class="lnil lnil-vector-pen"></i>
                  <h4>UI/UX Design</h4>
                  <p>
                    Designing a perfect user experience is in the scope of this
                    project.
                  </p>
                </div>
                <div class="project-feature">
                  <i aria-hidden="true" class="lnil lnil-alarm-clock"></i>
                  <h4>1 Week Sprints</h4>
                  <p>
                    This project development iterations follow a 1 week sprint
                    pattern.
                  </p>
                </div>
                <div class="project-feature">
                  <i aria-hidden="true" class="lnil lnil-calendar"></i>
                  <h4>3 Months</h4>
                  <p>
                    This project and all related tasks should completed within 3
                    months.
                  </p>
                </div>
                <div class="project-feature">
                  <i aria-hidden="true" class="lnil lnil-diamond-alt"></i>
                  <h4>Fixed</h4>
                  <p>
                    This project's budget planning is based on an imutable fixed
                    bid.
                  </p>
                </div>
              </div>

              <div class="project-files">
                <h4>Recent Files</h4>
                <div class="columns is-multiline">
                  <div class="column is-6">
                    <div class="file-box">
                      <img src="https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png" alt="" />
                      <div class="meta">
                        <span>Preliminary Sketches</span>
                        <span>
                          3MB <i aria-hidden="true" class="fas fa-circle"></i> 5
                          days ago
                        </span>
                      </div>
                      <FileCardDropdown />
                    </div>
                  </div>
                  <div class="column is-6">
                    <div class="file-box">
                      <img src="/images/icons/files/pdf.svg" alt="" />
                      <div class="meta">
                        <span>Project Scope</span>
                        <span>
                          0.8MB
                          <i aria-hidden="true" class="fas fa-circle"></i> 7
                          days ago
                        </span>
                      </div>
                      <FileCardDropdown />
                    </div>
                  </div>
                  <div class="column is-6">
                    <div class="file-box">
                      <img src="/images/icons/files/presentation.svg" alt="" />
                      <div class="meta">
                        <span>Project Presentation</span>
                        <span>
                          2.4MB
                          <i aria-hidden="true" class="fas fa-circle"></i> 7
                          days ago
                        </span>
                      </div>
                      <FileCardDropdown />
                    </div>
                  </div>
                  <div class="column is-6">
                    <div class="file-box">
                      <img src="https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png" alt="" />
                      <div class="meta">
                        <span>Project Budget</span>
                        <span>
                          0.6MB
                          <i aria-hidden="true" class="fas fa-circle"></i> 8
                          days ago
                        </span>
                      </div>
                      <FileCardDropdown />
                    </div>
                  </div>
                  <div class="column is-6">
                    <div class="file-box">
                      <img src="/images/icons/files/doc.svg" alt="" />
                      <div class="meta">
                        <span>Project Notes</span>
                        <span>
                          0.4MB
                          <i aria-hidden="true" class="fas fa-circle"></i> 8
                          days ago
                        </span>
                      </div>
                      <FileCardDropdown />
                    </div>
                  </div>
                  <div class="column is-6">
                    <div class="file-box">
                      <img src="https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png" alt="" />
                      <div class="meta">
                        <span>POC Demo</span>
                        <span>
                          8.75MB
                          <i aria-hidden="true" class="fas fa-circle"></i> 8
                          days ago
                        </span>
                      </div>
                      <FileCardDropdown />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="column is-4">
            <div class="side-card">
              <h4>Project Tools</h4>

              <V-Block center title="Sketch" subtitle="Design Software">
                <template #icon>
                  <V-Avatar
                    size="small"
                    picture="/images/icons/stacks/sketch.svg"
                  />
                </template>
              </V-Block>

              <V-Block center title="Illustrator" subtitle="Design Software">
                <template #icon>
                  <V-Avatar
                    size="small"
                    picture="/images/icons/stacks/illustrator.svg"
                  />
                </template>
              </V-Block>

              <V-Block center title="Photoshop" subtitle="Design Software">
                <template #icon>
                  <V-Avatar
                    size="small"
                    picture="/images/icons/stacks/photoshop.svg"
                  />
                </template>
              </V-Block>
            </div>

            <div class="side-card">
              <h4>Project Stacks</h4>

              <V-Block center title="Html5" subtitle="Hypertext Markup">
                <template #icon>
                  <V-Avatar
                    size="small"
                    picture="/images/icons/stacks/html5.svg"
                  />
                </template>
              </V-Block>

              <V-Block center title="CSS3" subtitle="Cascading Stylesheets">
                <template #icon>
                  <V-Avatar
                    size="small"
                    picture="/images/icons/stacks/css3.svg"
                  />
                </template>
              </V-Block>

              <V-Block center title="VueJS" subtitle="Javascript Framework">
                <template #icon>
                  <V-Avatar
                    size="small"
                    picture="/images/icons/stacks/vuejs.svg"
                  />
                </template>
              </V-Block>
            </div>

            <div class="side-card">
              <h4>Customer</h4>

              <V-Block
                center
                title="VFlights"
                subtitle="Transportation company"
              >
                <template #icon>
                  <V-Avatar
                    size="small"
                    picture="/@src/assets/illustrations/dashboards/flights/company1.svg"
                  />
                </template>
              </V-Block>
            </div>
          </div>
        </div>
      </div>

      <!--Project Team-->
      <div
        id="team-tab"
        class="tab-content"
        :class="[activeTab === 'team' && 'is-active']"
      >
        <div class="project-details-inner">
          <div class="project-team-card">
            <div class="columns is-multiline">
              <!--Team Member-->
              <div class="column is-6 has-border-bottom">
                <V-Block center title="Alice C." subtitle="Software Engineer">
                  <template #icon>
                    <V-Avatar size="medium" picture="https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png" />
                  </template>

                  <template #action>
                    <TeamCardDropdown />
                  </template>
                </V-Block>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si
                  enim ad populum me vocas, eum. Quod cum dixissent, ille
                  contra. Cur id non ita fit? Duo Reges: constructio interrete.
                </p>
              </div>
              <!--Team Member-->
              <div class="column is-6 has-border-bottom">
                <V-Block center title="Anna B." subtitle="UX Designer">
                  <template #icon>
                    <V-Avatar size="medium" picture="/demo/avatars/9.jpg" />
                  </template>

                  <template #action>
                    <TeamCardDropdown />
                  </template>
                </V-Block>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si
                  enim ad populum me vocas, eum. Quod cum dixissent, ille
                  contra. Cur id non ita fit? Duo Reges: constructio interrete.
                </p>
              </div>
              <!--Team Member-->
              <div class="column is-6 has-border-bottom">
                <V-Block center title="Joshua S." subtitle="Backend Developer">
                  <template #icon>
                    <V-Avatar size="medium" picture="https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png" />
                  </template>

                  <template #action>
                    <TeamCardDropdown />
                  </template>
                </V-Block>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si
                  enim ad populum me vocas, eum. Quod cum dixissent, ille
                  contra. Cur id non ita fit? Duo Reges: constructio interrete.
                </p>
              </div>
              <!--Team Member-->
              <div class="column is-6 has-border-bottom">
                <V-Block center title="Erik K." subtitle="Product Manager">
                  <template #icon>
                    <V-Avatar size="medium" picture="https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png" />
                  </template>

                  <template #action>
                    <TeamCardDropdown />
                  </template>
                </V-Block>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si
                  enim ad populum me vocas, eum. Quod cum dixissent, ille
                  contra. Cur id non ita fit? Duo Reges: constructio interrete.
                </p>
              </div>
              <!--Team Member-->
              <div class="column is-6 has-border-bottom">
                <V-Block center title="Melany W." subtitle="Web Developer">
                  <template #icon>
                    <V-Avatar size="medium" picture="https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png" />
                  </template>

                  <template #action>
                    <TeamCardDropdown />
                  </template>
                </V-Block>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si
                  enim ad populum me vocas, eum. Quod cum dixissent, ille
                  contra. Cur id non ita fit? Duo Reges: constructio interrete.
                </p>
              </div>
              <!--Team Member-->
              <div class="column is-6 has-border-bottom">
                <V-Block center title="Tara S." subtitle="UI/UX Designer">
                  <template #icon>
                    <V-Avatar size="medium" picture="https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png" />
                  </template>

                  <template #action>
                    <TeamCardDropdown />
                  </template>
                </V-Block>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si
                  enim ad populum me vocas, eum. Quod cum dixissent, ille
                  contra. Cur id non ita fit? Duo Reges: constructio interrete.
                </p>
              </div>
              <!--Team Member-->
              <div class="column is-6">
                <V-Block center title="Esteban C." subtitle="UI/UX Designer">
                  <template #icon>
                    <V-Avatar size="medium" picture="/demo/avatars/18.jpg" />
                  </template>

                  <template #action>
                    <TeamCardDropdown />
                  </template>
                </V-Block>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si
                  enim ad populum me vocas, eum. Quod cum dixissent, ille
                  contra. Cur id non ita fit? Duo Reges: constructio interrete.
                </p>
              </div>
              <!--Team Member-->
              <div class="column is-6">
                <V-Block center title="Mary L." subtitle="Project Manager">
                  <template #icon>
                    <V-Avatar size="medium" picture="/demo/avatars/5.jpg" />
                  </template>

                  <template #action>
                    <TeamCardDropdown />
                  </template>
                </V-Block>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si
                  enim ad populum me vocas, eum. Quod cum dixissent, ille
                  contra. Cur id non ita fit? Duo Reges: constructio interrete.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="tasks-tab"
        class="tab-content"
        :class="[activeTab === 'tasks' && 'is-active']"
      >
        <div class="project-details-inner">
          <div class="task-grid">
            <div class="grid-header">
              <h3>Tasks</h3>
              <div class="filter">
                <span>Filter by</span>
                <V-Control>
                  <Multiselect
                    v-model="filterTasks"
                    :options="['New', 'In Progress', 'Closed', 'Archived']"
                    placeholder="In Progress"
                  />
                </V-Control>
              </div>
            </div>

            <div class="columns is-multiline">
              <!--Task-->
              <div class="column is-4">
                <div class="task-card right-panel-trigger">
                  <a class="title-wrap">
                    <h3>Build a desktop and mobile landing page wireframe</h3>
                    <span>45%</span>
                  </a>
                  <div class="content-wrap">
                    <div class="left">
                      <V-AvatarStack
                        size="small"
                        :avatars="[
                          { picture: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png' },
                          { picture: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png' },
                          { picture: '/demo/avatars/5.jpg' },
                        ]"
                      />
                      <div class="attachments">
                        <i aria-hidden="true" class="lnil lnil-paperclip"></i>
                        <span>3 attachments</span>
                      </div>
                    </div>
                    <div class="right">
                      <div class="circle-chart-wrapper is-info">
                        <CircleChart :value="45" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--Task-->
              <div class="column is-4">
                <div class="task-card right-panel-trigger">
                  <a class="title-wrap">
                    <h3>Build a custom video player javascript library</h3>
                    <span>90%</span>
                  </a>
                  <div class="content-wrap">
                    <div class="left">
                      <V-AvatarStack
                        size="small"
                        :avatars="[{ picture: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png' }]"
                      />
                      <div class="attachments">
                        <i aria-hidden="true" class="lnil lnil-paperclip"></i>
                        <span>1 attachment</span>
                      </div>
                    </div>
                    <div class="right">
                      <div class="circle-chart-wrapper is-success">
                        <CircleChart :value="90" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--Task-->
              <div class="column is-4">
                <div class="task-card right-panel-trigger">
                  <a class="title-wrap">
                    <h3>Develop a JWT authentication controller</h3>
                    <span>65%</span>
                  </a>
                  <div class="content-wrap">
                    <div class="left">
                      <V-AvatarStack
                        size="small"
                        :avatars="[{ picture: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png' }]"
                      />
                      <div class="attachments">
                        <i aria-hidden="true" class="lnil lnil-paperclip"></i>
                        <span>1 attachment</span>
                      </div>
                    </div>
                    <div class="right">
                      <div class="circle-chart-wrapper is-danger">
                        <CircleChart :value="65" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--Task-->
              <div class="column is-4">
                <div class="task-card right-panel-trigger">
                  <a class="title-wrap">
                    <h3>Design custom illustrations for landing page</h3>
                    <span>38%</span>
                  </a>
                  <div class="content-wrap">
                    <div class="left">
                      <V-AvatarStack
                        size="small"
                        :avatars="[
                          { picture: '/demo/avatars/5.jpg' },
                          { picture: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png' },
                        ]"
                      />
                      <div class="attachments">
                        <i aria-hidden="true" class="lnil lnil-paperclip"></i>
                        <span>1 attachment</span>
                      </div>
                    </div>
                    <div class="right">
                      <div class="circle-chart-wrapper is-warning">
                        <CircleChart :value="38" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--Task-->
              <div class="column is-4">
                <div class="task-card right-panel-trigger">
                  <a class="title-wrap">
                    <h3>Implement sign up with social media</h3>
                    <span>59%</span>
                  </a>
                  <div class="content-wrap">
                    <div class="left">
                      <V-AvatarStack
                        size="small"
                        :avatars="[{ picture: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png' }]"
                      />
                      <div class="attachments">
                        <i aria-hidden="true" class="lnil lnil-paperclip"></i>
                        <span>2 attachments</span>
                      </div>
                    </div>
                    <div class="right">
                      <div class="circle-chart-wrapper">
                        <CircleChart :value="59" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--Task-->
              <div class="column is-4">
                <div class="task-card right-panel-trigger">
                  <a class="title-wrap">
                    <h3>Implement user management API controller</h3>
                    <span>78%</span>
                  </a>
                  <div class="content-wrap">
                    <div class="left">
                      <V-AvatarStack
                        size="small"
                        :avatars="[
                          { picture: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png' },
                          { picture: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png' },
                        ]"
                      />
                      <div class="attachments">
                        <i aria-hidden="true" class="lnil lnil-paperclip"></i>
                        <span>3 attachments</span>
                      </div>
                    </div>
                    <div class="right">
                      <div class="circle-chart-wrapper is-info">
                        <CircleChart :value="78" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--Task-->
              <div class="column is-4">
                <div class="task-card right-panel-trigger">
                  <a class="title-wrap">
                    <h3>Implement job management API controller</h3>
                    <span>36%</span>
                  </a>
                  <div class="content-wrap">
                    <div class="left">
                      <V-AvatarStack
                        size="small"
                        :avatars="[
                          { picture: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png' },
                          { picture: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png' },
                        ]"
                      />
                      <div class="attachments">
                        <i aria-hidden="true" class="lnil lnil-paperclip"></i>
                        <span>3 attachments</span>
                      </div>
                    </div>
                    <div class="right">
                      <div class="circle-chart-wrapper is-success">
                        <CircleChart :value="36" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--Task-->
              <div class="column is-4">
                <div class="task-card right-panel-trigger">
                  <a class="title-wrap">
                    <h3>Review and refactor server side code</h3>
                    <span>49%</span>
                  </a>
                  <div class="content-wrap">
                    <div class="left">
                      <V-AvatarStack
                        size="small"
                        :avatars="[
                          { picture: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png' },
                          { picture: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png' },
                        ]"
                      />
                      <div class="attachments">
                        <i aria-hidden="true" class="lnil lnil-paperclip"></i>
                        <span>2 attachments</span>
                      </div>
                    </div>
                    <div class="right">
                      <div class="circle-chart-wrapper is-danger">
                        <CircleChart />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../../../scss/abstracts/_variables.scss';
@import '../../../../scss/abstracts/_mixins.scss';

/* ==========================================================================
1. Project Details
========================================================================== */

.is-navbar {
  .project-details {
    padding-top: 30px;
  }
}

.project-details {
  .tabs-wrapper {
    .tabs-inner {
      .tabs {
        margin: 0 auto;
        background: $white;
      }
    }
  }

  .project-details-inner {
    padding: 20px 0;

    .project-details-card {
      @include vuero-s-card();

      padding: 40px;

      .card-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;

        .title-wrap {
          h3 {
            font-family: $font-alt;
            font-size: 1.5rem;
            font-weight: 700;
            color: $dark-text;
            line-height: 1.2;
            transition: all 0.3s;
          }
        }
      }

      .project-overview {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 0;

        p {
          max-width: 420px;
        }
      }

      .project-features {
        display: flex;
        padding: 25px 0;
        border-top: 1px solid darken($fade-grey, 3%);
        border-bottom: 1px solid darken($fade-grey, 3%);

        .project-feature {
          margin-right: 20px;
          width: calc(25% - 20px);

          i {
            font-size: 1.6rem;
            color: $primary;
            margin-bottom: 8px;
          }

          h4 {
            font-family: $font-alt;
            font-size: 0.85rem;
            font-weight: 600;
            color: $dark;
          }

          p {
            line-height: 1.2;
            font-size: 0.85rem;
            color: $light-text;
            margin-bottom: 0;
          }
        }
      }

      .project-files {
        padding: 20px 0;

        h4 {
          font-family: $font-alt;
          font-weight: 600;
          font-size: 0.8rem;
          text-transform: uppercase;
          color: $primary;
          margin-bottom: 12px;
        }

        .file-box {
          display: flex;
          align-items: center;
          padding: 8px;
          background: $white;
          border: 1px solid transparent;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s;

          &:hover {
            border-color: darken($fade-grey, 3%);
            box-shadow: $light-box-shadow;
          }

          img {
            display: block;
            width: 48px;
            min-width: 48px;
            height: 48px;
          }

          .meta {
            margin-left: 12px;
            line-height: 1.3;

            span {
              display: block;

              &:first-child {
                font-family: $font-alt;
                font-size: 0.9rem;
                font-weight: 600;
                color: $dark-text;
              }

              &:nth-child(2) {
                font-size: 0.9rem;
                color: $light-text;

                i {
                  position: relative;
                  top: -3px;
                  font-size: 0.3rem;
                  color: $light-text;
                  margin: 0 4px;
                }
              }
            }
          }

          .dropdown {
            margin-left: auto;
          }
        }
      }
    }

    .side-card {
      @include vuero-s-card();

      padding: 40px;
      margin-bottom: 1.5rem;

      h4 {
        font-family: $font-alt;
        font-weight: 600;
        font-size: 0.8rem;
        text-transform: uppercase;
        color: $primary;
        margin-bottom: 16px;
      }
    }

    .project-team-card {
      @include vuero-s-card();

      padding: 40px;
      max-width: 940px;
      display: block;
      margin: 0 auto;

      .column {
        padding: 1.5rem;

        &:nth-child(odd) {
          border-right: 1px solid darken($fade-grey, 3%);
        }

        &.has-border-bottom {
          border-bottom: 1px solid darken($fade-grey, 3%);
        }
      }
    }

    .task-grid {
      .grid-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;

        h3 {
          font-family: $font-alt;
          font-size: 1.5rem;
          font-weight: 700;
          color: $dark-text;
          line-height: 1.2;
        }

        .filter {
          display: flex;
          align-items: center;
          background: $white;
          padding: 8px 24px;
          border-radius: 100px;

          > span {
            font-family: $font-alt;
            font-size: 0.85rem;
            font-weight: 600;
            color: $dark-text;
            margin-right: 20px;
          }

          .multiselect {
            min-width: 140px;

            .multiselect-input {
              border: none;
            }
          }
        }
      }

      .task-card {
        @include vuero-s-card();

        min-height: 200px;
        display: flex !important;
        flex-direction: column;
        justify-content: space-between;
        padding: 30px;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          transform: translateY(-5px);
          box-shadow: $light-box-shadow;
        }

        .title-wrap {
          h3 {
            font-size: 1.1rem;
            font-family: $font-alt;
            font-weight: 600;
            color: $dark-text;
            line-height: 1.2;
            margin-bottom: 4px;
          }

          span {
            font-family: $font;
            font-size: 0.9rem;
            color: $light-text;
          }
        }

        .content-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .left {
            .avatar-stack {
              margin-bottom: 6px;
            }

            .attachments {
              display: flex;
              align-items: center;

              i {
                font-size: 15px;
                color: $light-text;
              }

              span {
                margin-left: 2px;
                font-size: 0.9rem;
                font-family: $font;
                color: $light-text;
              }
            }
          }
        }
      }
    }
  }
}

/* ==========================================================================
2. Project Details Dark Mode
========================================================================== */

.is-dark {
  .project-details {
    .project-details-inner {
      .project-details-card {
        @include vuero-card--dark();

        .card-head {
          .title-wrap {
            h3 {
              color: $dark-dark-text !important;
            }
          }
        }

        .project-features {
          border-color: lighten($dark-sidebar, 12%);

          .project-feature {
            i {
              color: $accent;
            }

            h4 {
              color: $dark-dark-text;
            }
          }
        }

        .project-files {
          h4 {
            color: $accent;
          }

          .file-box {
            background: lighten($dark-sidebar, 3%);

            &:hover {
              border-color: lighten($dark-sidebar, 10%);
            }

            .meta {
              span {
                &:first-child {
                  color: $dark-dark-text;
                }
              }
            }
          }
        }
      }

      .side-card {
        @include vuero-card--dark();

        h4 {
          color: $accent;
        }
      }

      .project-team-card {
        @include vuero-card--dark();

        .column {
          border-color: lighten($dark-sidebar, 12%);
        }
      }

      .task-grid {
        .grid-header {
          h3 {
            color: $dark-dark-text;
          }

          .filter {
            background: lighten($dark-sidebar, 1%) !important;
            border-color: lighten($dark-sidebar, 4%) !important;

            > span {
              color: $dark-dark-text;
            }
          }
        }

        .task-card {
          @include vuero-card--dark();

          .title-wrap {
            h3 {
              color: $dark-dark-text;
            }
          }
        }
      }
    }
  }
}

/* ==========================================================================
3. Media Queries
========================================================================== */

@media only screen and (max-width: 767px) {
  .project-details {
    .project-details-inner {
      .project-details-card {
        padding: 30px;

        .project-overview {
          flex-direction: column;

          p {
            margin-bottom: 20px;
          }
        }

        .project-features {
          flex-wrap: wrap;

          .project-feature {
            width: calc(50% - 20px);
            text-align: center;
            margin: 0 10px;

            &:first-child,
            &:nth-child(2) {
              margin-bottom: 20px;
            }
          }
        }
      }

      .project-team-card {
        padding: 30px;

        .column {
          border-right: none !important;
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
  .project-details {
    .project-details-inner {
      .project-details-card {
        .project-files {
          .columns {
            display: flex;

            .column {
              min-width: 50%;
            }
          }
        }
      }

      .project-team-card {
        .columns {
          display: flex;

          .column {
            min-width: 50%;
          }
        }
      }

      .task-grid {
        .columns {
          display: flex;

          .column {
            min-width: 50%;
          }
        }
      }
    }
  }
}
</style>
