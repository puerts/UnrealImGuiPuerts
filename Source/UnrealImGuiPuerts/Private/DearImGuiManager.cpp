// Fill out your copyright notice in the Description page of Project Settings.


#include "DearImGuiManager.h"
#ifdef IMGUI_API
#include <ImGuiModule.h>
#endif

UDearImGuiManager::UDearImGuiManager()
{
#ifdef IMGUI_API
	DelegateHandle = FImGuiModule::Get().AddMultiContextImGuiDelegate(FImGuiDelegate::CreateUObject(this, &UDearImGuiManager::OnImGuiDraw)); // display in game ui
	//DelegateHandle = FImGuiModule::Get().AddWorldImGuiDelegate(FImGuiDelegate::CreateUObject(this, &UDearImGuiManager::OnImGuiDraw)); // display in game ui
	//DelegateHandle = FImGuiModule::Get().AddEditorImGuiDelegate(FImGuiDelegate::CreateUObject(this, &UDearImGuiManager::OnImGuiDraw)); // display nothing
#endif
}

void UDearImGuiManager::OnImGuiDraw()
{
	if (OnDraw.IsBound())
	{
		OnDraw.Broadcast();
	}
}

void UDearImGuiManager::SetInputMode(bool bEnabled) const
{
#ifdef IMGUI_API
	FImGuiModule::Get().SetInputMode(bEnabled);
#endif
}

UDearImGuiManager::~UDearImGuiManager()
{
	FImGuiModule::Get().RemoveImGuiDelegate(DelegateHandle);
}