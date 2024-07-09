// const UtilHelper = require('../models/helpers/UtilsHelper');

const OPTIONS = {
  appVersion: '1.0.0',
  jwtTokenExpiry: '7d',
  appSchemaUrl: 'project_name',
  timeZone: 'Asia/Kolkata',
  emailSenderName: 'S2P Edutech',
  otpExpireInDays: 1,
  orderNumber: 1000,
  socketPublicGroups: {
    USER_PROFILE: 'user.profile#',
  },
  socketPrivateGroups: {
    USER_PRIVATE: 'user.id#',
    PRIVATE_ROOM: 'private_room.id#',
    PRIVATE_ORDER_LIST: 'private_order_list.id#',
    GLOBAL_CHANNEL: 'globalChannel',
  },
  socketOnEvents: {
    AUTHENTICATE: 'authenticate',
    CREATE_ORDER: 'createOrder',
    SEND_MESSAGE: 'sendMessage',
    DELETE_MESSAGE: 'deleteMessage',
    LIST_MESSAGE: 'listMessages',
    LIST_ORDER: 'listOrder',
  },
  socketEmitEvents: {
    RECEIVE_ORDER: 'receiveOrder',
    RECEIVE_MESSAGE: 'receiveMessage',
    ERROR_MESSAGE: 'errorMessage',
  },
  usersRoles: {
    SUPER_ADMIN: 'SUPER_ADMIN',
    ADMIN: 'ADMIN',
    SHOP: 'SHOP',
    CUSTOMER: 'CUSTOMER',
   STUDENT:'STUDENT',
    getAllRolesAsArray: function () {
      return [
        OPTIONS.usersRoles.SUPER_ADMIN,
        OPTIONS.usersRoles.ADMIN,
        OPTIONS.usersRoles.SHOP,
        OPTIONS.usersRoles.CUSTOMER,
        OPTIONS.usersRoles.STUDENT,
      ];
    },
    getAdmin: () => [OPTIONS.usersRoles.SUPER_ADMIN, OPTIONS.usersRoles.ADMIN],
    getStudent: () => [OPTIONS.usersRoles.STUDENT],
    getUser: () => [OPTIONS.usersRoles.SHOP, OPTIONS.usersRoles.CUSTOMER],
  },
  genders: {
    MALE: 'Male',
    FEMALE: 'Female',
    TRANSGENDER: 'Transgender',
  },
  otpVerifyActionTypes: {
    MOBILE_NUMBER_VERIFY: 'mobile_number_verify',
    RESET_PASSWORD: 'reset_password',
    ACCOUNT_VERIFY: 'account_verify',
  },
  defaultStatus: {
    ACTIVE: 'active', 
    INACTIVE: 'inactive',
    UNAPPROVED: 'unapproved',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    DELETED: 'deleted',
    CANCEL: 'cancel',
    getAllStatusAsArray: function () {
      return [
        OPTIONS.defaultStatus.ACTIVE,
        OPTIONS.defaultStatus.INACTIVE,
        OPTIONS.defaultStatus.DELETED,
        OPTIONS.defaultStatus.APPROVED,
        OPTIONS.defaultStatus.UNAPPROVED,
        OPTIONS.defaultStatus.REJECTED,
        OPTIONS.defaultStatus.CANCEL,
       
      ];
    },
  },
  orderStatus: {
    ACTIVE: 'active',
    ACCEPTED:'accepted',
    DISPATCH: 'dispatched',
    DELIVER: 'delivered',
    CANCEL: 'cancelled',
    RETURN: 'returned',
    NEW: 'new',
    getAllOrderStatusAsArray: function () {
      return [
        OPTIONS.orderStatus.DISPATCH,
        OPTIONS.orderStatus.ACTIVE,
        OPTIONS.orderStatus.DELIVER,
        OPTIONS.orderStatus.CANCEL,
        OPTIONS.orderStatus.RETURN,
        OPTIONS.orderStatus.ACCEPTED,
        OPTIONS.orderStatus.NEW,
      ];
    },
  },
  onlineStatus: {
    AVAILABLE: 'available',
    UN_AVAILABLE: 'un_available',
  },
  notificationTitle: {
    NEW_ORDER: `New Order !!`,
    NEW_ORDER_RECEIVED: `New order received !!`,
    STATUS_ORDER: (status) => `Order ${status} !!`,
    NEW_PRODUCT_REQUEST: `New product request !!`,
    STATUS_PRODUCT_REQUEST: 'Product request update !!',
    CHAT_MESSAGE: `New chat message !!`,
    OFFER_SHOP: `New deals & offer !!`,
    PLAN_EXPIRED: `Subscription plan expired !!`,
    PLAN_EXPIRED_WARNING: `Subscription plan expiry warning !!`,
    FEEDBACK: `New feedback received !!`,
    ENQUIRY: `New enquiry received !!`,
  },
  notificationMessage: {
    NEW_ORDER: (name, orderNumber) =>
      `Hey ${name}! Your order #${orderNumber} is successfully placed. View your order details here`,
    NEW_ORDER_RECEIVED: (name) =>
      `You have received a new order from ${name}. Check here`,
    STATUS_ORDER: (name, orderNumber, status) =>
      `Hey ${name}! Your order #${orderNumber} is ${status}. View your order details here`,
    DELIVERY_ORDER: (name, orderNumber, status) =>
      `Hey ${name}! Your order #${orderNumber} is ready. Please visit the shop to collect`,
    REJECTED_ORDER: (name, orderNumber) =>
      `Hey ${name}! Your order #${orderNumber} is cancelled. Check reason here and provide feedback here`,
    NEW_PRODUCT_REQUEST: (number) =>
      `You have received a new product request #${number}`,
    STATUS_PRODUCT_REQUEST: (status) =>
      `Your product request has been ${status}. Check the status here.`,
    CHAT_MESSAGE_SEND: (name) => `You have a message from ${name}.`,
    OFFER_SHOP: () => `Hey, there's a new offer. Please check deals & offer`,
    PLAN_EXPIRED: `Your subscription plan is expired. Please renew it to enjoy services`,
    PLAN_EXPIRED_IN_DAYS: (day) =>
      `Your subscription plan is going to expired in ${day} days. Please renew it to enjoy services`,
    PLAN_EXPIRED_TODAY: `Your subscription plan is going to expired today. Please renew it to enjoy services`,
    FEEDBACK: `You have received a new feedback. View feedback in admin panel`,
    ENQUIRY: `You have received a new enquiry. View enquiry in admin panel`,
    PRODUCT_REQUEST: `You have received a new product request. View product request in admin panel`,
  },
  notificationType: {
    ORDER: 'order',
    PRODUCT_REQUEST: 'product_request',
    CHAT_MESSAGE: `chat_message`,
    PROMOTION: 'promotion',
    SUBSCRIPTION_PLAN: `subscription_plan`,
    FEEDBACK: `feedback`,
    ENQUIRY: `enquiry`,
  },
  devicePlatforms: {
    ANDROID: 'android',
    IOS: 'ios',
    WEB: 'web',
  },
  emailSubjects: {
    ACCOUNT_WELCOME: 'Welcome mail',
    ACCOUNT_VERIFY: 'Verification OTP',
    ACCOUNT_ACTIVATE: 'Activate your account',
    FORGOT_PASSWORD: 'Change your password',
  },
  notificationMode: {
    NOTIFICATION_TRIGGER_ALL: 'notification_trigger_all',
    NOTIFICATION_TRIGGER_EMAIL: 'notification_trigger_email',
    NOTIFICATION_TRIGGER_IN_APP: 'notification_trigger_in_app',
  },
  notificationType: {
    FOLLOW_USER: 'follow_user',
    NEW_POST: 'new_post',
  },
  // generateCloudFrontUrl: UtilHelper.generateCloudFrontUrl,
  // generateOtp: UtilHelper.generateOtp,
  // generateCreateData: async (createObj, requestBody) => {
  //   for (let i = Object.keys(requestBody).length - 1; i >= 0; i--) {
  //     const key = Object.keys(requestBody)[i];
  //     createObj[key] = requestBody[key];
  //   }
  //   return createObj;
  // },
};
module.exports = OPTIONS;
