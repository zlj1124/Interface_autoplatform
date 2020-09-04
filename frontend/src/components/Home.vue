<template>
		<el-row class="container">
			<el-col :span="24" class="header">

				<!-- title :自动化测试平台 -->	            
				<el-col :span="20" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
					<router-link to="/projectList" style='text-decoration: none;color: #fff;'>{{collapsed?'':sysName}}</router-link>
				</el-col>
	
				<!-- title :用户信息 -->
				<el-col :span="4" class="userinfo">
					<el-dropdown trigger="hover">
						<span class="el-dropdown-link userinfo-inner">
							{{sysUserName}}
							<img src="../assets/userphoto.jpg"/>
						</span>
						<el-dropdown-menu slot="dropdown">
							<!-- <el-dropdown-item>我的消息</el-dropdown-item>
							<el-dropdown-item>设置</el-dropdown-item> -->
						<el-dropdown-item  @click.native="logout">退出</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-col>
			</el-col>
	
	
			<el-col :span="24" class="main">
				<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
					<!--导航菜单-->
					<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @select="handleselect"
							 unique-opened router v-if="!collapsed">
						<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden"><i :class="child.iconCls"></i>{{child.name}}</el-menu-item>
						</template>
					</el-menu>
				</aside>

				<section class="content-container">
					<div class="grid-content bg-purple-light">
						<el-col :span="24" class="breadcrumb-container">
							<strong class="title">{{$route.name}}</strong>
							<el-breadcrumb separator="/" class="breadcrumb-inner">
								<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
									{{ item.name }}
								</el-breadcrumb-item>
							</el-breadcrumb>
						</el-col>
						<el-col :span="24" class="content-wrapper">
							<transition name="fade" mode="out-in">
								<router-view></router-view>
							</transition>
						</el-col>
					</div>
				</section>

			</el-col>

		</el-row>
	</template>
	
	<script>
		export default {
			data() {
				return {
					sysName:'自动化API测试平台',
					collapsed:false,
					sysUserName: '',
					// sysUserAvatar: '',
					form: {
						name: '',
						region: '',
						date1: '',
						date2: '',
						delivery: false,
						type: [],
						resource: '',
						desc: ''
					}
				}
			},
			methods: {
			
			
				//退出登录
				logout: function () {
					var _this = this;
					this.$confirm('确认退出吗?', '提示', {
						//type: 'warning'
					}).then(() => {
						sessionStorage.removeItem('token');
						_this.$router.push('/login');
					})
				},

			
			},
			mounted() {
				var user = sessionStorage.getItem('username');
				if (user) {
					name = JSON.parse(user);
					this.sysUserName = name || '';
	//				this.sysUserAvatar = '../assets/user.png';
				}
	
			}
		}
	
	</script>
	
	<style scoped lang="scss">

	
		.container {
			position: absolute;
			top: 0px;
			bottom: 0px;
			width: 100%;
			.header {
				height: 60px;
				line-height: 60px;
				background: #20a0ff;
				color:#fff;
				.userinfo {
					text-align: right;
					padding-right: 35px;
					float: right;
					.userinfo-inner {
						cursor: pointer;
						color:#fff;
						img {
							width: 40px;
							height: 40px;
							border-radius: 20px;
							margin: 10px 0px 10px 10px;
							float: right;
						}
					}
				}
				.logo {
					//width:230px;
					height:60px;
					font-size: 22px;
					padding-left:20px;
					padding-right:20px;
					border-color: rgba(238,241,146,0.3);
					border-right-width: 1px;
					border-right-style: solid;
					img {
						width: 40px;
						float: left;
						margin: 10px 10px 10px 18px;
					}
					.txt {
						color:#fff;
					}
				}
				.logo-width{
					width:230px;
				}
				.logo-collapse-width{
					width:60px
				}
			}
			.main {
				display: flex;
				//background: #324057;
				position: absolute;
				top: 60px;
				bottom: 0px;
				overflow: hidden;
				margin-left: 0px;
				aside {
					flex:0 0 230px;
					width: 230px;
					.el-menu{
						height: 100%;
					}
					.collapsed{
						width:60px;
						.item{
							position: relative;
						}
						.submenu{
							position:absolute;
							top:0px;
							left:60px;
							z-index:99999;
							height:auto;
							display:none;
						}
	
					}
				}
				.menu-collapsed{
					flex:0 0 60px;
					width: 60px;
				}
				.menu-expanded{
					flex:0 0 230px;
					width: 230px;
				}
				.content-container {
				
					flex:1;
					overflow-y: scroll;
					padding: 20px;
					.breadcrumb-container {
						//margin-bottom: 15px;
						.title {
							width: 200px;
							float: left;
							color: #475669;
						}
						.breadcrumb-inner {
							float: right;
						}
					}
					.content-wrapper {
						background-color: #fff;
						box-sizing: border-box;
					}
				}
			}
		}
	</style>
	