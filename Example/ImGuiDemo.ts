import * as UE from 'ue'
import {Render} from './ImGuiDemoPages'

let imGuiMgr = new UE.DearImGuiManager();

globalThis.__imguiMgr = imGuiMgr; // 不作为入口脚本可以不需要这句

imGuiMgr.SetInputMode(true);

imGuiMgr.OnDraw.Add(Render);
