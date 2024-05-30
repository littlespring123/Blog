<template>
    <div class="topp">
   <div class="title">提交表单</div>
    </div>
    <div class="content">
   
        <el-form
    ref="ruleFormRef"
    style="max-width: 600px"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
  >
  <el-form-item label="Email" prop="email">
      <el-input v-model="ruleForm.email" type="email" />
    </el-form-item>

    <el-form-item label="Password" prop="pass">
      <el-input v-model="ruleForm.pass" type="password" autocomplete="off" show-password />
    </el-form-item>
    <el-form-item label="Confirm" prop="checkPass">
      <el-input
        v-model="ruleForm.checkPass"
        type="password"
        show-password
      />
    </el-form-item>

    <el-form-item label="Nikename" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>

    <el-form-item label="Address" prop="address">
      <el-cascader
      v-model="ruleForm.address"
      :options="options"
      placeholder="请选择省份/城市"
    ></el-cascader>
     
    </el-form-item>

    <el-form-item label="Phonenum" prop="phonenum">
      <div style="display: flex; align-items: center;">
    <el-select v-model="prefix" placeholder="请选择国家代码" style="flex: 2;">
      <el-option label="+86" value="86"></el-option>
      <!-- 在这里添加其他国家代码的选项 -->
    </el-select>
    <el-input
      v-model="ruleForm.phonenum"
      placeholder="请输入手机号码"
      :maxlength="11"
      clearable
      style="flex: 5;"
    ></el-input>
  </div>
  </el-form-item>

        </el-form>


    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const ruleFormRef = ref<FormInstance>()
    const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass')
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}
const validateEmail = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the email again'))
  } else if (ruleForm.email!=='') {
      // 使用正则表达式验证邮箱格式
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(value)) {
      callback('请输入有效的邮箱地址'); // 如果格式不匹配，返回错误信息
  } }else {
    callback()
  }
}

const validateNikename = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the name again'))
  } else if (ruleForm.name!=='') {
    const length = value.trim().length; // 获取去除首尾空格后的字符串长度
    if (length < 3 || length > 8) {
      callback('昵称长度必须在3到8之间'); // 如果长度不在范围内，返回错误信息
   }}else {
    callback()
  }
}

const validateAddress = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the address again'))
  } else {
    callback()
  }
}

const validatePhonenum = (rule: any, value: any, callback: any) => {
  const reg = /^[1][3-9]\d{9}$/; // 正则表达式匹配手机号码格式
  if (value === '') {
    callback(new Error('请输入手机号码')); // 空值检查
  } else if (!reg.test(value)) {
    callback(new Error('请输入正确的手机号码')); // 格式检查
  } else {
    callback(); // 通过验证
  }
}
const ruleForm = reactive({
  pass: '',
  checkPass: '',
  email:'',
  name:'',
  address:'',
  phonenum:'',
  
})

/**
 * 自定义规则
 */
//  这里大部分规则，使用默认就可以。
// required参数需要修改 true
const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ required:'true',validator: validatePass, trigger: 'blur' }],// 密码，需要自定义规则
  checkPass: [{ required:'true',validator: validatePass2, trigger: 'blur' }],// 确认密码，需要自定义规则
  email:[{required:'true',validator:validateEmail,trigger:'blur'}], // 邮箱，
  name: [{ required: 'true', validator: validateNikename, trigger: 'blur' }], // 昵称，长度判断用max,min
  // name: [{ required: true, min: 3, max: 8, trigger: 'blur'  }], 
  address:[{required:'true',validator:validateAddress,trigger:'blur'}], // 地址
  phonenum:[{required:'true',validator:validatePhonenum,trigger:'blur'}],
  
})

const options = ref([
      {
        value: 'shanghai',
        label: '上海',
        children: [
          {
            value: 'shanghai',
            label: '上海',
          },
        ],
      },
      {
        value: 'beijing',
        label: '北京',
        children: [
          {
            value: 'beijing',
            label: '北京',
          },
        ],
      },
    ]);
    let prefix=ref('86');

</script>
<style scoped>
.topp{
    position: relative;
    top:-24px;
    left:-20px;
width: 1180px;
height: 60px;
background-color: rgba(255,255,255,1);
border: 0px solid rgba(187,187,187,1);
    
}
.title{
    position: absolute;
    top:21px;
    left:23px; 
width: 73px;
height: 27px;
line-height: 27px;
color: rgba(0,0,0,1);
font-size: 18px;
text-align: left;
font-family: SourceHanSansSC-regular;
}



</style>