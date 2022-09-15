import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { MerchantRoleAPI } from './MerchantRole';

// import httpService from '@/shared/plugins/http'
// import { GameAPI } from './game'
// import { GameStyleAPI } from './GameStyle'
// import { MerchantAPI } from './Merchant'
// import { ShopAPI } from './Shop'
import { ScriptStyleAPI } from './ScriptStyle';
import { ScriptSubjectAPI } from './ScriptSubject';
import { ScriptSearchAPI } from './ScriptSearch';
import { OrderAPI } from './Order';
import { RoomsAPI } from './Room';
import { ScriptAPI } from './Script';
import { GameShopAPI } from './GameShop';
import { GameShopPicsAPI } from './GameShopPics';
import { GameShopScriptAPI } from './GameShopScript';
import { PlayerAPI } from './Player';
import { SystemAPI } from './System';
import { PasswordAPI } from './Password';
import { MerchantAPI } from './Merchant';
import { PlayerRoleAPI } from './PlayerRole';
import { ShopCommentsAPI } from './ShopComments';
import { ScriptCommentsAPI } from './ScriptComments';
// import { MerchantUploadAPI, PlayerAPI, PlayerRoleAPI, PlayerUploadAPI } from '.'
// import { GameShopBannerAPI } from './GameShopBanner'
// import { FavoriteProductAPI } from './FavoriteProduct'
import { EventAPI } from './Event';
// import { FaqAPI } from './Faq'
// import { AbuseReportAPI } from './AbuseReport'
// import { AnnAPI } from './Ann'

class AppAdminService {
  // http: AxiosInstance
  // shop: ShopAPI
  // game: GameAPI
  script: ScriptAPI;
  password: PasswordAPI;
  system: SystemAPI;
  room: RoomsAPI;
  merchant: MerchantAPI;
  // gameStyle: GameStyleAPI
  order: OrderAPI;
  gameShop: GameShopAPI;
  gameShopPics: GameShopPicsAPI;
  gameShopScript: GameShopScriptAPI;
  // gameShopBanner: GameShopBannerAPI
  scriptStyle: ScriptStyleAPI;
  scriptSearch: ScriptSearchAPI;
  scriptSubject: ScriptSubjectAPI;
  shopComment: ShopCommentsAPI;
  scriptComment: ScriptCommentsAPI;
  // merchant: MerchantAPI
  // merchantRole: MerchantRoleAPI
  // merchantUpload:MerchantUploadAPI

  player: PlayerAPI;
  playerRole: PlayerRoleAPI;
  // playerUpload: PlayerUploadAPI
  // favoriteProduct: FavoriteProductAPI

  event: EventAPI;
  // faq:FaqAPI
  // ann:AnnAPI
  // abuseReport:AbuseReportAPI

  constructor() {
    // this.http = axIns
    // this.game = new GameAPI(this.http)
    this.order = new OrderAPI();
    this.password = new PasswordAPI();
    this.script = new ScriptAPI();
    this.system = new SystemAPI();
    this.room = new RoomsAPI();
    this.merchant = new MerchantAPI();
    // this.shop = new ShopAPI(this.http)
    this.gameShop = new GameShopAPI();
    this.gameShopPics = new GameShopPicsAPI();
    this.gameShopScript = new GameShopScriptAPI();
    this.shopComment = new ShopCommentsAPI();
    this.scriptComment = new ScriptCommentsAPI();
    // this.gameShopBanner = new GameShopBannerAPI(this.http)
    // this.gameStyle = new GameStyleAPI(this.http)
    this.scriptStyle = new ScriptStyleAPI();
    this.scriptSearch = new ScriptSearchAPI();
    this.scriptSubject = new ScriptSubjectAPI();
    // this.merchant = new MerchantAPI(this.http)
    // this.merchantRole = new MerchantRoleAPI(this.http)

    this.player = new PlayerAPI();
    this.playerRole = new PlayerRoleAPI();
    // this.playerUpload = new PlayerUploadAPI(this.http)
    // this.merchantUpload = new MerchantUploadAPI(this.http)
    // this.favoriteProduct = new FavoriteProductAPI(this.http)
    this.event = new EventAPI();
    // this.faq = new FaqAPI(this.http)
    // this.ann = new AnnAPI(this.http)
    // this.abuseReport = new AbuseReportAPI(this.http)
  }
}

export const appAdmin = new AppAdminService();
